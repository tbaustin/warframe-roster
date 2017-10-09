// dependencies
require('dotenv').config({silent: true});
const google = require('googleapis');
const fs = require('fs-extra');

// credential info
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

/**
 * Create a JWT client with the given credentials, and then execute the given callback function
 * @protected
 * @param {Object} credentials Authorization client credentials
 */
function authorizeJWT(credentials) {
    const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        SCOPES,
        null
    );

    return auth;
}

/**
    Load and prepare credentials for auth (currently uses environment variables)
    Nothing actually async going on immediately but this uses promises anyway to keep the flow promise-based
    in case anything changes later
    @protected
    @returns {Promise.<Object>} Credentials object ready to pass to a new google JWT
*/
function prepareCredentials() {
    const credentials = {
        client_email: process.env.YOUTUBE_CLIENT_EMAIL,
        private_key: process.env.YOUTUBE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
    return Promise.resolve(credentials);
}

/**
 * Load client secrets from a local file (or sets up credentials, if they do not exist)
 * @returns {Promise.<Object|Error>} Returns a promise that resolves to the auth client or rejects to an error
 */
function auth() {
    return prepareCredentials().then(credentials => {
        return authorizeJWT(credentials);
    })
    .catch(err => {
        console.error('Error loading client secret file: '+err);
        throw err; // application cannot continue without valid credentials
    });
}







/**
* Turns an array of YouTube video response items with snippets into an array of flattened video objects
* @param {Array} videos Array of YouTube video response items
* @returns {Array.<String>} Array of YouTube video ID strings
*/
function formatYoutubeVideos(videos) {
    return videos.map(video => (
        {
            urlId: video.snippet.resourceId.videoId,
            title: video.snippet.title,
            thumbnail: {
					url: video.snippet.thumbnails ? video.snippet.thumbnails.default.url : 0,
					width: video.snippet.thumbnails ? video.snippet.thumbnails.default.width : 0,
					height: video.snippet.thumbnails ? video.snippet.thumbnails.default.height : 0
            }
        }
    ));
}

/**
* Reformats playlist data from Youtube API response into more easily consumable/flattened form
* @param {Array} playlists Array of YouTube playlist response items
* @returns {Array.<Object>} Array of objects containing flattened YouTube playlist data
*/
function formatYoutubePlaylists(playlists) {
    return playlists.map(playlist => (
        {
            id: playlist.id,
            publishedAt: playlist.snippet.publishedAt,
            channelId: playlist.snippet.channelId,
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            thumbnails: playlist.snippet.thumbnails,
            channelTitle: playlist.snippet.channelTitle,
            tags: playlist.snippet.tags,
            localized: playlist.snippet.localized
        }
    ));
}

/**
* Fetch channel uploads YouTube playlist ID
* @param {Object} auth Authenticated Google auth client
* @param {String} channelName Name of channel to fetch upload playlist ID for
* @returns {String} Channel uploads playlist ID
*/
function getChannelPlaylistId(auth, channelName) {
    const service = google.youtube('v3');
    const params = {
        auth,
        forUsername: channelName,
        part: 'contentDetails'
    };
    return new Promise((resolve, reject) => {
        service.channels.list(params, {}, (err, res) => {
            if (err) {
                console.error('Error fetching channel ID: '+err);
                reject(err);
            }
            else {
                resolve(res.items[0].contentDetails.relatedPlaylists.uploads);
            }
        })
    });
}

/**
* Fetch channel Youtube ID
* @param {Object} auth Authenticated Google auth client
* @param {String} channelName Name of channel to fetch ID for
* @returns {String} Channel ID
*/
function getChannelId(auth, channelName) {
    const service = google.youtube('v3');
    const params = {
        auth,
        forUsername: channelName,
        part: 'id'
    };
    return new Promise((resolve, reject) => {
        service.channels.list(params, {}, (err, res) => {
            if (err) {
                console.error('Error fetching channel ID: '+err);
                reject(err);
            }
            else {
                resolve(res.items[0].id);
            }
        })
    });
}

/**
* Fetch channel playlists
* @param {Object} auth Authenticated Google auth client
* @param {String} channelId ID of channel to fetch playlists from
* @returns {Array.<Object>} Array of objects with playlist information
*/
function getChannelPlaylists(auth, channelId) {
    const service = google.youtube('v3');
    const params = {
        auth,
        channelId,
        part: 'id, snippet'
    };
    return new Promise((resolve, reject) => {
        service.playlists.list(params, {}, (err, res) => {
            if (err) {
                console.error('Error fetching channel playlists: '+err);
                reject(err);
            }
            else {
                resolve(formatYoutubePlaylists(res.items));
            }
        })
    });
}

/**
* Fetches playlist videos and returns their IDs
* @param {Object} auth Authenticated Google auth client
* @param {String} playlistId ID of playlist to fetch videos from
* @param {Number} maxResults Maximum number of results to retrieve
* @returns {Array.<String>} Array of video IDs
*/
function readPlaylistVideos(auth, playlistId, maxResults) {
    const service = google.youtube('v3');
    const params = {
        auth,
        playlistId,
        part: 'snippet',
        maxResults
    }
    return new Promise((resolve, reject) => {
        service.playlistItems.list(params, {}, (err, res) => {
            if (err) {
                console.error('Error fetching channel videos: '+err);
                reject(err);
            }
            else {
                resolve(formatYoutubeVideos(res.items));
            }
        })
    });
}

/**
* Reads all videos from a list of playlists and returns them listed with their playlist
* @param {Object} auth Authenticated Google auth client
* @param {Array.<Object>} playlists Array of playlists to fetch videos from
* @param {Number} maxResults Maximum number of results to retrieve for each playlist
* @returns {Object} Object containing playlist video IDs listed with their playlist as {videos: ..., playlist: ...}
*/
function readListPlaylistVideos(auth, playlists, maxResults) {
    const promises = playlists.map(playlist => (
        readPlaylistVideos(auth, playlist.id, maxResults)
        .then(videos => ({videos, playlist}))
    ));
    return Promise.all(promises).then(videos => {
        return videos;
    });
}






/**
* Saves video data to a JSON file
* @param {*} videos Video data to write to file
* @param {Object} options
* @param {Object.<String>} options.name JSON file name (without extension)
* @param {Object.<String>} options.dir JSON file directory (with trailing slash)
* @returns {Promise} Promise that will resolve when file is saved
*/
function saveVideos(videos, {name = 'youtube', dir = './json/videos/'}) {
   const writeData = {videos};
   return fs.outputJson(`${dir}${name}.json`, writeData, {spaces: '\t'});
}





// old script, gets channel uploads
/*auth().then(authClient => {
    console.log('authenticated youtube client successfully');
    getChannelPlaylistId(authClient, 'OfficialBearArchery').then(channelId => {
        return readPlaylistVideos(authClient, channelId, 20);
    }).then(videos => {
        console.log('finished reading channel videos');
        console.dir(videos);
        return saveVideos(videos, {});
    }).then(() => {
        console.log('videos saved');
    });
})*/

// new script, gets channel playlists with their videos
auth().then(authClient => {
    console.log('authenticated');
    getChannelId(authClient, 'OfficialBearArchery').then(channelId => {
        return getChannelPlaylists(authClient, channelId);
    }).then(channelPlaylists => {
        return readListPlaylistVideos(authClient, channelPlaylists, 20);
    }).then(playlistVideos => {
        return saveVideos(playlistVideos, {});
    }).then(() => {
        console.log('videos saved');
    });
});