interface RefreshAccessToken {
    access_token: string;
    token_type: "bearer";
    /** Number of seconds till the token expires */
    expires_in: number;
}

type InstagramAccountType = "BUSINESS" | "MEDIA_CREATOR" | "PERSONAL";
type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

interface UserNode {
    /** The User's account type. Can be BUSINESS, MEDIA_CREATOR, or PERSONAL. */
    account_type: InstagramAccountType;
    /** The app user's app-scoped ID (version 11.0+) or raw user ID (version 10.0 and lower). */
    id: string;
    /** The number of Media on the User. This field requires the instagram_graph_user_media permission. */
    media_count: number;
    /** The User's username. */
    username: string;
    /** List of Media on the User. */
    media: UserMedia[];
}

interface UserMedia {
    /** The Media's caption text. Not returnable for Media in albums. */
    caption: string;
    /** The Media's ID. */
    id: string;
    /** For Reels only. When true, indicates that the reel can appear in both the Feed and Reels tabs. When false, indicates the reel can only appear in the Reels tab. */
    is_shared_to_feed: string;
    /** The Media's type. Can be IMAGE, VIDEO, or CAROUSEL_ALBUM. */
    media_type: InstagramMediaType;
    /** The Media's URL. */
    media_url: string;
    /** The Media's permanent URL. Will be omitted if the Media contains copyrighted material, or has been flagged for a copyright violation. */
    permalink?: string;
    /** The Media's thumbnail image URL. Only available on VIDEO Media. */
    thumbnail_url: string;
    /** The Media's publish date in ISO 8601 format. */
    timestamp: string;
    /** The Media owner's username. */
    username: string;
}

interface Config {
    appId: string;
    redirectUri: string;
    appSecret: string;
}

declare class InstagramBasicDisplayApi {
    /**
     * Create a new instance of instagram basic display api class
     * @param {Config} config
     */
    constructor(config: Config);

    /**
     * The URL on which users can log in with instagram
     * @returns Authorization URL
     */
    authorizationUrl: string;

    /**
     * Refreshes an unexpired long-life access token
     * @param accessToken a user's long-life access token
     * @returns {Promise<RefreshAccessToken>}
     */
    refreshLongLivedToken(accessToken: string): Promise<RefreshAccessToken>;

    /**
     * Retrieves an access token (ttl: 1h)
     * @param userCode can be found in querystring of redirect URI after authorization
     * @returns {Promise<RefreshAccessToken>}
     */
    retrieveToken(userCode: string): Promise<RefreshAccessToken>;

    /**
     * Retrieves an longer living access token (ttl: 60d)
     * @param accessToken user's access token
     * @returns {Promise<RefreshAccessToken>}
     */
    retrieveLongLivedToken(accessToken: string): Promise<RefreshAccessToken>;

    /**
     * Retrieves information about the user
     * @param accessToken user's access token
     * @param fields available fields: `id,username,account_type,media_count,media` (see https://developers.facebook.com/docs/instagram-basic-display-api/reference/user#fields for reference)
     * @returns {Promise<UserNode>}
     */
    retrieveUserNode(accessToken: string, fields: string): Promise<UserNode>;

    /**
     * Retrieves user media
     * @param accessToken user's access token
     * @param fields available fields: `caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username` (see https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields for reference)
     * @returns {Promise<UserMedia[]>}
     */
    retrieveUserMedia(
        accessToken: string,
        limit: number,
        fields: string
    ): Promise<UserMedia[]>;

    /**
     * Retrieves media data
     * @param accessToken user's access token
     * @param mediaId the media id
     * @param fields available fields: `caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username` (see https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields for reference)
     * @returns {Promise<UserMedia>}
     */
    retrieveMediaData(
        accessToken: string,
        mediaId: string | number,
        fields: string
    ): Promise<UserMedia>;
}

export default InstagramBasicDisplayApi;
