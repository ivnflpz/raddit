import React, { Component } from 'react';
import ReactPlayer from 'react-player'

import parser from 'html-react-parser';

import './RedditContent.scss';
import { Media, Listing, RedditVideo, Oembed, Preview } from '../../models';

class RedditContent extends Component<{listing: Listing},{}> { 
    renderVideo(video: RedditVideo) {
        return <ReactPlayer url={video.fallback_url} controls={true} width="600" />
    }

    renderFrame(oembed: Oembed) {
        return (
            <div className="iframe-container" >
                {parser(oembed.html)}
            </div>
        )
    }

    renderPreview(preview: Preview) {
        if (preview.reddit_video_preview != null) {
            return this.renderVideo(preview.reddit_video_preview);
        } else if (preview.images != null) {
            const url = preview.images[0].source.url;
            return <img className="preview-image" alt="Post Image" src={url}></img>
        }
        return "";
    }

    renderText(selftext_html: string) {
        return (
            <div className="text-container">
                {parser(selftext_html)}
            </div>
        )
    }

    renderMedia(media: Media) {
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