interface Listing {
    title: string;
    author_fullname: string;
    created_utc: number;
    score: number;
    // media_embed: any;
    media: any;
    num_comments: number;
    preview?: any;
    selftext_html?: string;
    subreddit: string;
}

export default Listing;