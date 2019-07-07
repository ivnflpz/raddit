import Listing from "../models/Listing";
import { SortCategory } from '../models/SortCategory';

const snoowrap = require('snoowrap');

const wrapper = new snoowrap({
    userAgent: process.env.REACT_APP_USER_AGENT,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN
});

function destroyCache(subreddit: string) {
    const keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key.startsWith(subreddit)) {
            localStorage.removeItem(key);
        }
    }
}

const redditApi = {
    search(subreddit: string, sort: SortCategory) {
        if (subreddit.trim().length === 0) {
            return new Promise(resolve => resolve([]));
        }

        let cacheKey = subreddit + '.' + sort;
        if (cacheKey in localStorage) {
            const l = localStorage.getItem(cacheKey);
            if (l !== null) {
                return new Promise((resolve) => {
                    resolve(JSON.parse(l));
                });
            }
        }

        let searchFunc;
        switch (sort) {
            case SortCategory.Hot:
                searchFunc = () => wrapper.getSubreddit(subreddit).getHot({limit: 50});
                break;
            case SortCategory.New:
                searchFunc = () => wrapper.getSubreddit(subreddit).getNew({limit: 50});
                break;
            case SortCategory.Controversial:
                searchFunc = () => wrapper.getSubreddit(subreddit).getControversial({limit: 50, time: 'all'});
                break;
            case SortCategory.Top:
                searchFunc = () => wrapper.getSubreddit(subreddit).getTop({limit: 50, time: 'all'});
                break;
            case SortCategory.Rising:
                searchFunc = () => wrapper.getSubreddit(subreddit).getRising({limit: 50});
                break;
            default:
                searchFunc = () => new Promise(resolve => resolve([]));
        }
        console.log(searchFunc);
        return searchFunc().then((results: any) => {
            localStorage.setItem(cacheKey, JSON.stringify(results));
            return results;
        });
    },

    upvote(listing: Listing) {
        return new Promise((resolve, reject) => {
            wrapper.getSubmission(listing.id).upvote()
                .then(() => {
                    destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    },

    downvote(listing: Listing) {
        return new Promise((resolve, reject) => {
            wrapper.getSubmission(listing.id).downvote()
                .then(() => {
                    destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    },

    unvote(listing: Listing) {
        return new Promise((resolve, reject) => {
            wrapper.getSubmission(listing.id).unvote()
                .then(() => {
                    destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    }
}

export default redditApi;