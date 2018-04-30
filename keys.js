//getting stored api keys from .env and exporting api keys
console.log("----------------------------------------------------------------");
console.log('Keys.js file is loaded');
require('dotenv').config();  //to pull in API Keys from .env file

var twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET  
};
exports.twitter = twitter;
// console.log("Twitter Consumer Key is " + twitter.consumer_key);
// console.log("Twitter Consumer Secret is " + twitter.consumer_secret);
// console.log("Twitter Token Key is " + twitter.access_token_key);
// console.log("Twitter Token Secret is " + twitter.access_token_secret);

var spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
exports.spotify = spotify;
// console.log("Spotify ID is " + spotify.id);
// console.log("Spotify Secret is " + spotify.secret);


var geocoder = {key: process.env.GOOGLE_API_KEY};
exports.geocoder = geocoder;
// console.log("Geocoder Key is " + geocoder.key);

var omdb = {apikey: process.env.OMDB_apikey};
exports.omdb = omdb;
// console.log("OMDB Key is " + omdb.apikey);
console.log("----------------------------------------------------------------");