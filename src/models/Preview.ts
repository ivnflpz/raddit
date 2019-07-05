import { RedditVideo } from "./Media";

export interface ImageSource {
    height: number;
    width: number;
    url: string;
}

export interface RedditImage {
    id: string;
    source: ImageSource;
}

export interface Preview {
    images?: RedditImage[];
    reddit_video_preview?: RedditVideo;
}

