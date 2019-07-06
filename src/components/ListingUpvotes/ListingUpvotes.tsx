import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import './ListingUpvotes.scss';
import Listing from '../../models/Listing';
import util from '../../helpers/util';
import redditApi from '../../services/RedditApi';

const SCORE_INCREMENT = 1;
enum Direction {
    Up,
    Down,
    None
}

interface ListingUpvotesState {
    score: number;
    direction: Direction;
}
class ListingUpvotes extends Component<{listing: Listing}, ListingUpvotesState> { 
    constructor(props: any) {
        super(props);
        this.state = {
            score: 0,
            direction: Direction.None
        }

        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote= this.handleDownvote.bind(this);
        this.handleVote= this.handleVote.bind(this);
    }

    componentDidMount() {
        const listing = this.props.listing;
        let direction = Direction.None;
        if (listing.likes != null) {
            direction = listing.likes ? Direction.Up : Direction.Down;
        }
        this.setState({score: listing.score, direction: direction});
    }

    handleUpvote() {
        const listing = this.props.listing;
        const oldScore = listing.score;
        const oldDirection = this.state.direction;

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
        this.handleVote(listing, newDirection, oldScore, oldDirection);
    }

    handleDownvote() {
        const listing = this.props.listing;
        const oldScore = listing.score;
        const oldDirection = this.state.direction;

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
        this.handleVote(listing, newDirection, oldScore, oldDirection);
    }

    handleVote(listing: Listing, newDirection: Direction, oldScore: number, oldDirection: Direction) {
        this.setState({score: listing.score, direction: newDirection});

        let voteFunc = redditApi.unvote;
        switch (newDirection) {
            case Direction.Up:
                voteFunc = redditApi.upvote;
                break;
            case Direction.Down:
                voteFunc = redditApi.downvote;
                break;
            default:
        }
        voteFunc(listing.id).catch((error: any) => {
            this.setState({score: oldScore, direction: oldDirection});
        });
    }

    render() {
        const listing: Listing = this.props.listing;
        let scoreString = util.normalizeNumber(listing.score);

        const upClasses = classnames({
            up: true,
            upvoted: this.state.direction === Direction.Up
        });

        const scoreClasses = classnames({
            score: true,
            upvoted: this.state.direction === Direction.Up,
            downvoted: this.state.direction === Direction.Down
        });

        const downClasses = classnames({
            down: true,
            downvoted: this.state.direction === Direction.Down
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