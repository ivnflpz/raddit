import React, { Component } from 'react';

import './RedditManager.css';
import Listing from '../../models/Listing';
import RedditSearch from '../RedditSearch/RedditSearch';
import RedditList from '../RedditList/RedditList';

const uuid = require('uuid/v4');

class RedditManager extends Component<{}, {results: Listing[]}> { 
    constructor(props: any) {
        super(props);

        this.state = {
            results: []
        }
    }

    handleResults = (results: Listing[]) => {
        this.setState({results: results});
    }

    render() {
        const results = this.state.results;
        const listElem: any = results.length > 0
            ? <RedditList key={uuid()} results={results}></RedditList>
            : '';
        return (
            <div className="container">
                <RedditSearch handleResults={this.handleResults}></RedditSearch>
                {listElem}
            </div>
        )
    }
}

export default RedditManager;