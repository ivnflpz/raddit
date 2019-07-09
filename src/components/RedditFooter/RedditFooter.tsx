import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './RedditFooter.scss';
import { Listing } from '../../models';
import util from '../../helpers/util';

class RedditFooter extends Component<{listing: Listing},{}> {
    renderFooter(numComments: number) {
        let numString = util.normalizeNumber(numComments);
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
                        <FontAwesomeIcon icon="award"></FontAwesomeIcon>
                        <span className="link-text">Give award</span>
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