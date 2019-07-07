import { Media } from './Media';
import { Preview } from './Preview';

interface Listing {
    id: string;
    title: string;
    author_fullname: string;
    created_utc: number;
    score: number;
    likes?: boolean;
    media: Media;
    num_comments: number;
    preview?: Preview;
    selftext_html?: string;
    subreddit: string;
}

export default Listing;