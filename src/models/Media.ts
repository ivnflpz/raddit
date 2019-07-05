export interface Oembed {
    description: string;
    height: number;
    width: number;
    html: string;
}

export interface RedditVideo {
    duration: number;
    fallback_url: string;
    height: number;
    width: number;
}

export interface Media {
    oembed?: Oembed;
    reddit_video?: RedditVideo;
}
