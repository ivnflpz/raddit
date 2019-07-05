import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './RedditFooter.scss';
import Listing from '../../models/Listing';

class RedditFooter extends Component<{listing: Listing},{}> { 
    normalizeNumber(number: number) {
        if (number > 100000) {
            return (number / 1000).toFixed(0) + 'K';
        } else if (number > 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return '' + number;
    }

    renderFooter(numComments: number) {
        let numString = this.normalizeNumber(numComments);
        return (
            <div className="footer">
                <div className="link">
                    <a href="#">
                        <FontAwesomeIcon icon="comment-alt"></FontAwesomeIcon>
                        <span className="link-text">{numString} comments</span>
                    </a>
                </div>
                
                <div className="link">
                    <a href="#">
                        <FontAwesomeIcon icon="share"></FontAwesomeIcon>
                        <span className="link-text">Share</span>
                    </a>
                </div>

                <div className="link">
                    <a href="#">
                        <FontAwesomeIcon icon="bookmark"></FontAwesomeIcon>
                        <span className="link-text">Save</span>
                    </a>
                </div>
            </div>
        )
    }

    render() {
        const listing: Listing = this.props.listing;
        return this.renderFooter(listing.num_comments);
    }
}

export default RedditFooter;