import { Listing, SortCategory, SortOption } from '../models';

const snoowrap = require('snoowrap');

const wrapper = new snoowrap({
    userAgent: navigator.userAgent,
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
    search(subreddit: string, sortOptions: SortOption) {
        if (subreddit.trim().length === 0) {
            return new Promise(resolve => resolve([]));
        }

        let cacheKey = subreddit + '.' + sortOptions.type;
        if (sortOptions.timeSupported) {
            cacheKey += '.' + sortOptions.time;
        }
        if (cacheKey in localStorage) {
            const l = localStorage.getItem(cacheKey);
            if (l !== null) {
                return new Promise((resolve) => {
                    resolve(JSON.parse(l));
                });
            }
        }

        let searchFunc;
        switch (sortOptions.type) {
            case SortCategory.Hot:
                searchFunc = () => wrapper.getSubreddit(subreddit).getHot({limit: 50});
                break;
            case SortCategory.New:
                searchFunc = () => wrapper.getSubreddit(subreddit).getNew({limit: 50});
                break;
            case SortCategory.Controversial:
                searchFunc = () => wrapper.getSubreddit(subreddit).getControversial({limit: 50, time: sortOptions.time});
                break;
            case SortCategory.Top:
                searchFunc = () => wrapper.getSubreddit(subreddit).getTop({limit: 50, time: sortOptions.time});
                break;
            case SortCategory.Rising:
                searchFunc = () => wrapper.getSubreddit(subreddit).getRising({limit: 50});
                break;
            default:
                searchFunc = () => new Promise(resolve => resolve([]));
        }
        return searchFunc()
            // force fetch of all data before sending it to local storage
            .then(JSON.stringify)
            .then((result: string) => {
                localStorage.setItem(cacheKey, result);
                return JSON.parse(result);
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