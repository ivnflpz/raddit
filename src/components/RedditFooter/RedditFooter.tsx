import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './RedditFooter.scss';
import { Listing } from '../../models';
import util from '../../helpers/util';
import { RedditHandler } from '../../services/RedditHandler';

class RedditFooter extends Component<{listing: Listing},{saved: boolean}> {
    private redditHandler: RedditHandler;

    constructor(props: any) {
        super(props);

        this.state = {
            saved: false
        }

        this.redditHandler = RedditHandler.getInstance();
    }

    componentDidMount() {
        let saved = this.props.listing.saved;
        this.setState({saved});
    }

    toggleSave = () => {
        const listing = this.props.listing;

        if (this.state.saved) {
            this.setState({saved: false});
            this.redditHandler.unsave(listing).catch(() => {
                this.setState({saved: true});
            });
        } else {
            this.setState({saved: true});
            this.redditHandler.save(listing).catch(() => {
                this.setState({saved: false});
            });
        }
    }

    renderFooter(numComments: number) {
        let numString = util.normalizeNumber(numComments);
        return (
            <div className="footer">
                <div className="link">
                    <button>
                        <FontAwesomeIcon icon="comment-alt"></FontAwesomeIcon>
                        <span className="link-text">{numString} comments</span>
                    </button>
                </div>

                <div className="link">
                    <button>
                        <FontAwesomeIcon icon="award"></FontAwesomeIcon>
                        <span className="link-text">Give award</span>
                    </button>
                </div>
                
                <div className="link">
                    <button>
                        <FontAwesomeIcon icon="share"></FontAwesomeIcon>
                        <span className="link-text">Share</span>
                    </button>
                </div>

                <div className="link">
                    <button onClick={this.toggleSave}>
                        <FontAwesomeIcon icon="bookmark"></FontAwesomeIcon>
                        <span className="link-text">{this.state.saved ? 'Unsave' : 'Save'}</span>
                    </button>
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