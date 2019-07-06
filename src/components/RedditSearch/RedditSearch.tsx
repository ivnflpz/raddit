import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './RedditSearch.scss';

import redditApi from '../../services/RedditApi';

class RedditSearch extends React.Component<{handleResults: Function}, {query: string}> {
    constructor(props: any) {
        super(props);

        this.state = {
            query: ''
        }
    }

    search(query: string) {
        redditApi.getTop(query).then((results: any) => {
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