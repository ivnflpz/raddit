import { Media } from './Media';
import { Preview } from './Preview';

interface Listing {
    title: string;
    author_fullname: string;
    created_utc: number;
    score: number;
    media: Media;
    num_comments: number;
    preview?: Preview;
    selftext_html?: string;
    subreddit: string;
}

export default Listing;