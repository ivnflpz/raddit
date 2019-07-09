import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

import './RedditListing.scss';
import RedditContent from '../RedditContent/RedditContent';
import RedditFooter from '../RedditFooter/RedditFooter';
import ListingUpvotes from '../ListingUpvotes/ListingUpvotes';
import { Listing } from '../../models';

class RedditListing extends Component<{listing: Listing},{}> { 
    renderAuthor(author: string, created_utc: number) {
        return (
            <div className="header">
                <div className="author">
                    <span>Posted by </span>
                    {author}
                </div>
                <TimeAgo date={created_utc*1000}></TimeAgo>
            </div>
        )
    }

    renderTitle(title: string) {
        return (
            <div className="title">
                <h3>{title}</h3>
            </div>
        );
    }

    render() {
        const listing: Listing = this.props.listing;
        return (
            <div className="listing">
                <ListingUpvotes listing={listing}></ListingUpvotes>
                <div className="info">
                    {this.renderAuthor(listing.author, listing.created_utc)}
                    
                    {this.renderTitle(listing.title)}
                    <RedditContent listing={listing}></RedditContent>
                    <RedditFooter listing={listing}></RedditFooter>
                </div>
            </div>
        )
    }
}

export default RedditListing;