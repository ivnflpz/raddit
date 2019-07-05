import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ListingUpvotes.scss';
import Listing from '../../models/Listing';
import util from '../../helpers/util';

class ListingUpvotes extends Component<{listing: Listing},{}> { 
    render() {
        const listing: Listing = this.props.listing;
        let scoreString = util.normalizeNumber(listing.score);
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