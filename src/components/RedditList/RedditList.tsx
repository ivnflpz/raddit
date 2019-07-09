import React, { Component } from 'react';

import RedditListing from '../RedditListing/RedditListing';
import { Listing } from '../../models';

const InfiniteScroll = require('react-infinite-scroller');

interface RedditListProps {
    results: Listing[];
}
interface RedditListState {
    items: Listing[];
    hasMore: boolean;
}
class RedditList extends Component<RedditListProps, RedditListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            hasMore: true
        }
    }

    loadPage(page: number) {
        const all = this.props.results;
        if ((page - 1)* 10 >= all.length) {
            this.setState({hasMore: false});
            return;
        }

        let elems = all.slice((page - 1) * 10, page * 10)
        let items = this.state.items.slice();
        elems.forEach((e) => items.push(e));

        this.setState({
            items: items,
            hasMore: items.length <= all.length
        });
    }

    renderList() {
        if (this.props.results.length === 0) {
            return "";
        }

        let items: any[] = [];
        this.state.items.forEach((item, i) => {
            items.push(
                <RedditListing key={i} listing={item}></RedditListing>
            )
        });
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={(page: number) => this.loadPage(page)}
                hasMore={this.state.hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}>
                
                {items}
            </InfiniteScroll>
        )
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

export default RedditList;