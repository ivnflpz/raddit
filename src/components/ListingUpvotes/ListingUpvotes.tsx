import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import './ListingUpvotes.scss';
import { Listing, UpvoteDirection } from '../../models';
import util from '../../helpers/util';
import redditApi from '../../services/RedditApi';

const SCORE_INCREMENT = 1;
interface ListingUpvotesState {
    score: number;
    direction: UpvoteDirection;
}
class ListingUpvotes extends Component<{listing: Listing}, ListingUpvotesState> { 
    constructor(props: any) {
        super(props);
        this.state = {
            score: 0,
            direction: UpvoteDirection.None
        }

        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote = this.handleDownvote.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    componentDidMount() {
        const listing = this.props.listing;
        let direction = UpvoteDirection.None;
        if (listing.likes != null) {
            direction = listing.likes ? UpvoteDirection.Up : UpvoteDirection.Down;
        }
        this.setState({score: listing.score, direction: direction});
    }

    handleUpvote() {
        const listing = this.props.listing;
        const oldScore = listing.score;
        const oldDirection = this.state.direction;

        let newDirection = UpvoteDirection.Up;
        switch (this.state.direction) {
            case UpvoteDirection.Up:
                newDirection = UpvoteDirection.None;
                listing.score -= SCORE_INCREMENT;
                break;
            case UpvoteDirection.Down:
                listing.score += 2*SCORE_INCREMENT;
                break;
            case UpvoteDirection.None:
                listing.score += SCORE_INCREMENT;
                break;
        }
        this.handleVote(listing, newDirection, oldScore, oldDirection);
    }

    handleDownvote() {
        const listing = this.props.listing;
        const oldScore = listing.score;
        const oldDirection = this.state.direction;

        let newDirection = UpvoteDirection.Down;
        switch (this.state.direction) {
            case UpvoteDirection.Up:
                listing.score -= 2*SCORE_INCREMENT;
                break;
            case UpvoteDirection.Down:
                newDirection = UpvoteDirection.None;
                listing.score += SCORE_INCREMENT;
                break;
            case UpvoteDirection.None:
                listing.score -= SCORE_INCREMENT;
                break;
        }
        this.handleVote(listing, newDirection, oldScore, oldDirection);
    }

    handleVote(listing: Listing, newDirection: UpvoteDirection, oldScore: number, oldDirection: UpvoteDirection) {
        this.setState({score: listing.score, direction: newDirection});

        let voteFunc = redditApi.unvote;
        switch (newDirection) {
            case UpvoteDirection.Up:
                voteFunc = redditApi.upvote;
                break;
            case UpvoteDirection.Down:
                voteFunc = redditApi.downvote;
                break;
            default:
        }
        voteFunc(listing).catch(() => {
            this.setState({score: oldScore, direction: oldDirection});
        });
    }

    render() {
        const listing: Listing = this.props.listing;
        let scoreString = util.normalizeNumber(listing.score);

        const upClasses = classnames({
            up: true,
            upvoted: this.state.direction === UpvoteDirection.Up
        });

        const scoreClasses = classnames({
            score: true,
            upvoted: this.state.direction === UpvoteDirection.Up,
            downvoted: this.state.direction === UpvoteDirection.Down
        });

        const downClasses = classnames({
            down: true,
            downvoted: this.state.direction === UpvoteDirection.Down
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