import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ListingUpvotes.scss';
import Listing from '../../models/Listing';

class ListingUpvotes extends Component<{listing: Listing},{}> { 
    normalizeNumber(number: number) {
        if (number > 100000) {
            return (number / 1000).toFixed(0) + 'K';
        } else if (number > 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return '' + number;
    }

    render() {
        const listing: Listing = this.props.listing;
        let scoreString = this.normalizeNumber(listing.score);
        return (
            <div className="upvotes-container">
                <div className="upvotes">
                    <div className="up">
                        <FontAwesomeIcon icon="arrow-up"></FontAwesomeIcon>
                    </div>
                    
                    <div className="score">
                        {scoreString}
                    </div>

                    <div className="down">
                        <FontAwesomeIcon icon="arrow-down"></FontAwesomeIcon>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListingUpvotes;