import React, { Component } from 'react';

import './RedditManager.css';
import logo from '../../raddit.png';
import { Listing } from '../../models';
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

    renderContainer() {
        const results = this.state.results;
        return results.length > 0
            ? <RedditList key={uuid()} results={results}></RedditList>
            : <img src={logo} className="App-logo" alt="logo" />
    }

    render() {
        return (
            <div>
                <RedditSearch handleResults={this.handleResults}></RedditSearch>
                <div className="container">
                    {this.renderContainer()}
                </div>
            </div>
        )
    }
}

export default RedditManager;