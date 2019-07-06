import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import './ListingUpvotes.scss';
import Listing from '../../models/Listing';
import util from '../../helpers/util';
// import redditApi from '../../services/RedditApi';

const SCORE_INCREMENT = 1000;
enum Direction {
    Up,
    Down,
    None
}

interface ListingUpvotesState {
    score?: number;
    direction: Direction;
}
class ListingUpvotes extends Component<{listing: Listing}, ListingUpvotesState> { 
    constructor(props: any) {
        super(props);
        this.state = {
            score: undefined,
            direction: Direction.None
        }

        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote= this.handleDownvote.bind(this);
    }

    handleUpvote() {
        const listing = this.props.listing;
        let newDirection = Direction.Up;
        switch (this.state.direction) {
            case Direction.Up:
                newDirection = Direction.None;
                listing.score -= SCORE_INCREMENT;
                break;
            case Direction.Down:
                listing.score += 2*SCORE_INCREMENT;
                break;
            case Direction.None:
                listing.score += SCORE_INCREMENT;
                break;
        }
        this.setState({score: listing.score, direction: newDirection});
    }

    handleDownvote() {
        const listing = this.props.listing;
        let newDirection = Direction.Down;
        switch (this.state.direction) {
            case Direction.Up:
                listing.score -= 2*SCORE_INCREMENT;
                break;
            case Direction.Down:
                newDirection = Direction.None;
                listing.score += SCORE_INCREMENT;
                break;
            case Direction.None:
                listing.score -= SCORE_INCREMENT;
                break;
        }
        this.setState({score: listing.score, direction: newDirection});
    }

    render() {
        const listing: Listing = this.props.listing;
        const score = this.state.score || listing.score;
        let scoreString = util.normalizeNumber(score);

        const upClasses = classnames({
            up: true,
            upvoted: this.state.direction == Direction.Up
        });

        const scoreClasses = classnames({
            score: true,
            upvoted: this.state.direction == Direction.Up,
            downvoted: this.state.direction == Direction.Down
        });

        const downClasses = classnames({
            down: true,
            downvoted: this.state.direction == Direction.Down
        });
        return (
            <div className="upvotes-container">
                <div className="upvotes">
                    <div className={upClasses} onClick={this.handleUpvote}>
                        <FontAwesomeIcon icon="arrow-up"></FontAwesomeIcon>
                    </div>
                    
                    <div className={scoreClasses}>
                        {scoreString}
                    </div>

                    <div className={downClasses} onClick={this.handleDownvote}>
                        <FontAwesomeIcon icon="arrow-down"></FontAwesomeIcon>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListingUpvotes;