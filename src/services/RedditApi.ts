import Listing from "../models/Listing";

const snoowrap = require('snoowrap');

const wrapper = new snoowrap({
    userAgent: process.env.REACT_APP_USER_AGENT,
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    refreshToken: process.env.REACT_APP_REFRESH_TOKEN
});

const redditApi = {
    getTop(subreddit: string) {
        if (subreddit.trim().length === 0) {
            return;
        }

        if (subreddit in localStorage) {
            const l = localStorage.getItem(subreddit);
            if (l !== null) {
                return new Promise((resolve) => {
                    resolve(JSON.parse(l));
                });
            }
        }

        return wrapper.getSubreddit(subreddit).getTop({limit: 50, time: 'all'})
        .then((results: any) => {
            localStorage.setItem(subreddit, JSON.stringify(results));
            return results;
        });
    },

    upvote(listing: Listing) {
        return new Promise((resolve, reject) => {
            wrapper.getSubmission(listing.id).upvote()
                .then(() => {
                    for (let key in localStorage) {
                        if (key.startsWith(listing.subreddit)) {
                            localStorage.removeItem(key);
                        }
                    }
                    // this.destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    },

    downvote(listing: Listing) {
        return new Promise((resolve, reject) => {
            wrapper.getSubmission(listing.id).downvote()
                .then(() => {
                    for (let key in localStorage) {
                        if (key.startsWith(listing.subreddit)) {
                            localStorage.removeItem(key);
                        }
                    }
                    // this.destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    },

    unvote(listing: Listing) {
        return new Promise((resolve, reject) => {
            wrapper.getSubmission(listing.id).unvote()
                .then(() => {
                    for (let key in localStorage) {
                        if (key.startsWith(listing.subreddit)) {
                            localStorage.removeItem(key);
                        }
                    }
                    // this.destroyCache(listing.subreddit);
                    resolve();
                })
                .catch(reject)
        });
    },

    // todo: figure out why this isn't being called
    destroyCache(subreddit: string) {
        for (let key in localStorage) {
            if (key.startsWith(subreddit)) {
                localStorage.removeItem(key);
            }
        }
    }
}

export default redditApi;