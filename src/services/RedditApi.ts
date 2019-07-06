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

    upvote(submission: string) {
        return wrapper.getSubmission(submission).upvote();
    },

    downvote(submission: string) {
        return wrapper.getSubmission(submission).downvote();
    }
}

export default redditApi;