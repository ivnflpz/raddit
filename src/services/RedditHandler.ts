import { Listing, SortCategory, SortOption, TimeOptions } from '../models';
import util from '../helpers/util';

const snoowrap = require('snoowrap');

// 2 minutes
const DEFAULT_EXPIRATION_MS = 120000;

export class RedditHandler {
    private static instance: RedditHandler;

    private redditApi: any;
    
    private constructor() {
        this.redditApi = new snoowrap({
            userAgent: navigator.userAgent,
            clientId: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            refreshToken: process.env.REACT_APP_REFRESH_TOKEN
        });
    }

    static getInstance() {
        if (!RedditHandler.instance) {
            RedditHandler.instance = new RedditHandler();
        }
        return RedditHandler.instance;
    }

    search = (subreddit: string, sortOptions: SortOption) => {
        if (subreddit.trim().length === 0) {
            return new Promise(resolve => resolve([]));
        }

        let cacheKey = subreddit + '.' + sortOptions.type;
        let expiration_ms = DEFAULT_EXPIRATION_MS;
        if (sortOptions.timeSupported && sortOptions.time != null) {
            cacheKey += '.' + sortOptions.time;
            expiration_ms = TimeOptions[sortOptions.time].expiration_sec * 1000;
        }
        const jsonString = localStorage.getItem(cacheKey);
        if (jsonString !== null) {
            const cacheData = JSON.parse(jsonString);
            if (cacheData.fetched_at_ms + expiration_ms > util.currentUtc()) {
                return new Promise((resolve) => {
                    resolve(cacheData.results);
                });
            }
            localStorage.removeItem(cacheKey);
        }

        return this.handleSearch(subreddit, sortOptions, cacheKey);
    }

    upvote = (listing: Listing) => {
        return this.handleVote(() => this.redditApi.getSubmission(listing.id).upvote(), listing);
    }

    downvote= (listing: Listing) => {
        return this.handleVote(() => this.redditApi.getSubmission(listing.id).downvote(), listing);
    }

    unvote = (listing: Listing) => {
        return this.handleVote(() => this.redditApi.getSubmission(listing.id).unvote(), listing);
    }

    save = (listing: Listing) => {
        return this.redditApi.getSubmission(listing.id).save();
    }

    private handleSearch = (subreddit: string, sortOptions: SortOption, cacheKey: string) => {
        let searchFunc;
        switch (sortOptions.type) {
            case SortCategory.Hot:
                searchFunc = () => this.redditApi.getSubreddit(subreddit).getHot({limit: 50});
                break;
            case SortCategory.New:
                searchFunc = () => this.redditApi.getSubreddit(subreddit).getNew({limit: 50});
                break;
            case SortCategory.Controversial:
                searchFunc = () => this.redditApi.getSubreddit(subreddit).getControversial({limit: 50, time: sortOptions.time});
                break;
            case SortCategory.Top:
                searchFunc = () => this.redditApi.getSubreddit(subreddit).getTop({limit: 50, time: sortOptions.time});
                break;
            case SortCategory.Rising:
                searchFunc = () => this.redditApi.getSubreddit(subreddit).getRising({limit: 50});
                break;
            default:
                searchFunc = () => new Promise(resolve => resolve([]));
        }
        return searchFunc()
            .then((results: any) => {
                return { fetched_at_ms: util.currentUtc(), results: results}
            })
            // force fetch of all data before sending it to local storage
            .then(JSON.stringify)
            .then((result: string) => {
                localStorage.setItem(cacheKey, result);
                return JSON.parse(result).results;
            });
    }

    private handleVote = (voteFunc: Function, listing: Listing) => {
        return new Promise((resolve, reject) => {
            voteFunc()
                .then(() => {
                    this.destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    }

    private destroyCache = (subreddit: string) => {
        const keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key.startsWith(subreddit)) {
                localStorage.removeItem(key);
            }
        }
    }
}
