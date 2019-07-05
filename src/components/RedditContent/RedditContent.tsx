import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import parser from 'html-react-parser';

import './RedditContent.scss';
import Listing from '../../models/Listing';

interface RedditVideo {
    fallback_url: string;
}

class RedditContent extends Component<{listing: Listing},{}> { 
    renderVideo(video: RedditVideo) {
        return <ReactPlayer url={video.fallback_url} controls={true} width="600" />
    }

    renderFrame(media: any) {
        return (
            <div className="iframe-container" >
                {parser(media.html)}
            </div>
        )
    }

    renderPreview(preview: any) {
        if (preview.reddit_video_preview != null) {
            return this.renderVideo(preview.reddit_video_preview);
        }
        const url = preview.images[0].source.url;
        return <img className="preview-image" alt="Post Image" src={url}></img>
    }

    renderText(selftext_html: string) {
        return (
            <div className="text-container">
                {parser(selftext_html)}
            </div>
        )
    }

    renderMedia(media: any) {
        if (media.oembed != null) {
            return this.renderFrame(media.oembed);
        } else if (media.reddit_video != null) {
            return this.renderVideo(media.reddit_video);
        }
        return "";
    }

    renderContent(listing: Listing) {
        if (listing.media !== null) {
            return this.renderMedia(listing.media);
        } else if (listing.preview) {
            // images
            return this.renderPreview(listing.preview);
        } else if (listing.selftext_html) {
            // text
            return this.renderText(listing.selftext_html);
        }
        return "";
    }

    render() {
        const listing: Listing = this.props.listing;
        return (
            <div className="content">
                {this.renderContent(listing)}
            </div>
        )
    }
}

export default RedditContent;