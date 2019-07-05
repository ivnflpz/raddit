import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './RedditSearch.scss';
const snoowrap = require('snoowrap');

const redditApi = new snoowrap({
  userAgent: process.env.REACT_APP_USER_AGENT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  refreshToken: process.env.REACT_APP_REFRESH_TOKEN
});

class RedditSearch extends React.Component<{handleResults: Function}, {query: string}> {
    constructor(props: any) {
        super(props);

        this.state = {
            query: ''
        }
    }

    search(query: string) {
        if (query.trim().length === 0) {
            return;
        }

        if (query in localStorage) {
            const l = localStorage.getItem(query);
            if (l !== null) {
                let results = JSON.parse(l);
                this.props.handleResults(results);
                return;
            } 
        }

        redditApi.getSubreddit(query).getTop({limit: 50, time: 'all'})
        .then((results: any) => {
            localStorage.setItem(query, JSON.stringify(results));
            this.props.handleResults(results);
        });
    }

    updateQueryValue(evt: any) {
        this.setState({query: evt.target.value});
    }

    keyPressed(evt: any) {
        if (evt.key === "Enter") {
            this.search(this.state.query);
        }
    }

    render() {
        return (
            <div className="search-container">
                <FontAwesomeIcon icon="search"></FontAwesomeIcon>
                <input type="search" className="search" value={this.state.query} onChange={evt => this.updateQueryValue(evt)} onKeyPress={evt => this.keyPressed(evt)}/>
            </div>
        );
    }
}

export default RedditSearch;