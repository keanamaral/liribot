//Kean's liri bot
//////////////////////////////////////////////////////////////
//////////////////VARIABLES!!!!///////////////////////////////
//////////////////////////////////////////////////////////////
var keys = require("./keys.js");  //getting keys.js file
var fs = require("fs");
var request = require("request");
var inquirer = require("inquirer");

var geocoder = require("geocoder");
var Spotify = require("node-spotify-api");
var twitter = require("twitter");
var omdb = require("omdb-js");

var operator = process.argv[2];  //movie-this, search-tweets, my-tweets, spotify-this-song, do-what-it-says
var userSearch = process.argv[3];

var omdb_apikey = keys.omdb.apikey;
var geo_key = keys.geocoder.key;
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
var client = new twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});
// var twit_consKey = keys.twitter.consumer_key;
// var twit_consSec = keys.twitter.consumer_secret;
// var twit_tokKey = keys.twitter.access_token_key;
// var twit_tokSec = keys.twitter.access_token_secret;
// var spot_id = keys.spotify.id;
// var spot_sec = keys.spotify.secret;
// console.log("Checking Keys in liri.js File");
// console.log("omdb key in liri.js file is "+omdb_apikey);
// console.log("geo key in liri.js file is "+geo_key);
// console.log("spot_id in liri.js file is "+spot_id);
// console.log("spot_sec in liri.js file is "+spot_sec);
// console.log("twit_consKey in liri.js file is "+twit_consKey);
// console.log("twit_consSec in liri.js file is "+twit_consSec);
// console.log("twit_tokKey in liri.js file is "+twit_tokKey);
// console.log("twit_tokSec in liri.js file is "+twit_tokSec);
// console.log("----------------------------------------------------------------");

//////////////////////////////////////////////////////////////
///////////////////SWITCH CASES///////////////////////////////
//////////////////////////////////////////////////////////////
switch(operator) {
    case "movie-this": movieThis(); break;
    case "search-tweets": searchTweets(); break;
    case "my-tweets": myTweets(); break;
    case "spotify-this-song": spotifyThisSong(); break;
    case "do-what-it-says": doWhatItSays(); break;
    // Instructions displayed in terminal to the user
    default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
        "1. movie-this 'any movie name' " +"\r\n"+
        "2. search-tweets 'any tweet subject' "+"\r\n"+
        "3. my-tweets 'any twitter username' "+"\r\n"+
        "4. spotify-this-song 'any song name' "+"\r\n"+
        "5. do-what-it-says."+"\r\n"+
        "No need for quotation marks.");
};
//////////////////////////////////////////////////////////////
//////////////////////FUNCTIONS///////////////////////////////
//////////////////////////////////////////////////////////////
//FUNCTION 1: Movie Search////////////////////////////////////
//////////////////////////////////////////////////////////////
function movieThis(){
        var movieName = process.argv.splice(3).join("+");
    if(!userSearch){
        var movieName = "Mr. Nobody";
    }
    console.log("Movie name is: " + movieName);
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+omdb_apikey;
  request(queryUrl,
    function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieResults = 
            "------------------------------ begin ------------------------------" + "\r\n" +
            "The movie name is: " + JSON.parse(body).Title + "\r\n" +
            "The release year: " + JSON.parse(body).Year + "\r\n" +
            "The movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\r\n" +
            "The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value + "\r\n" +
            "The movie was produced in: " + JSON.parse(body).Country + "\r\n" +
            "The movie's language(s) is/are in: " + JSON.parse(body).Language + "\r\n" +
            "This movie's plot: " + JSON.parse(body).Plot + "\r\n" +
            "The movie's cast is: " + JSON.parse(body).Actors + "\r\n" +
            "------------------------------ end ------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults); // calling log function
            // console.log("The search result: " + JSON.stringify(body));
            // console.log("----------------------------------------------------------------");
        } else {
            console.log("There was a problem with the OMDB Movie Database: " + error);
            return;
            };
    });
    console.log("The query URL: " + queryUrl);
}
//////////////////////////////////////////////////////////////
//FUNCTION 2: Twitter Search Subject//////////////////////////
//////////////////////////////////////////////////////////////
function searchTweets(){
    var subject = process.argv.splice(3).join(" ");
    if(!userSearch){
        var subject = "Donald Trump";
    }
    var params = {
        q: subject,
        count: 10,
        result_type: 'recent',
        lang: 'en'
    }
    client.get('search/tweets', params, function (err, data, response) {
        if(err){
            console.log("Twitter Error: " + err);
        } else {
            var twitterSearchResults1 = 
            "------------------------------ begin ------------------------------" + "\r\n" +
            "Top " + params.count + " tweets for: " + params.q + "\r\n" +
            "Number of Tweets: " + data.statuses.length + "\r\n";
            var twitterSearchResults2 = [];
            for (var x=0; x<data.statuses.length; x++){
                twitterSearchResults2[x] =
                "Tweet " + x +" Created: " + data.statuses[x].created_at + "\r\n" +
                "Tweet text: " + data.statuses[x].text + "\r\n";
            };
            var twitterSearchResults3 =
            "------------------------------ end ------------------------------" + "\r\n";
            var twitterSearchResults = twitterSearchResults1 + twitterSearchResults2 + twitterSearchResults3;
            console.log(twitterSearchResults);
            log(twitterSearchResults); // calling log function
        }
        // console.log("The search result: " + JSON.stringify(data));  //this prints out the entire response object
    });
}
//////////////////////////////////////////////////////////////
//FUNCTION 3: Twitter My Tweets///////////////////////////////
//////////////////////////////////////////////////////////////
function myTweets(){
    var twitterUsername = process.argv.splice(3).join("");
    if(!twitterUsername){
        var twitterUsername = "keanamaral";
    };
    var myparams = {
        screen_name: twitterUsername,
        mycount: 10,
        myresult_type: 'recent',
    };
    client.get('statuses/user_timeline/', myparams, function (err, data, response) {
        if(err){
            console.log("Twitter Error: " + err);
        } else {
            var twitterSearchResults1 = 
            "------------------------------ begin ------------------------------" + "\r\n" +
            "My Recent " + myparams.mycount + " tweets." + "\r\n" +
            "Number of Tweets: " + myparams.mycount + "\r\n";
            var twitterSearchResults2 = [];
            for (var x=0; x<data.length; x++){
                twitterSearchResults2[x] =
                "@" + data[x].user.screen_name + " wrote: " + data[x].text + "\r\n" +
                "Created at: " + data[x].created_at + "\r\n";
            };
            var twitterSearchResults3 =
            "------------------------------ end ------------------------------" + "\r\n";
            var twitterSearchResults = twitterSearchResults1 + twitterSearchResults2 + twitterSearchResults3;
            console.log(twitterSearchResults);
            log(twitterSearchResults); // calling log function
            };
    });
}
///////////////////////////////////////////////////////////////////////////////
//FUNCTION 4: SPOTIFY//////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function spotifyThisSong(songName){
    var songName = process.argv.splice(3).join(" ");
    if(!userSearch){
        var songName = "I started a joke";
    };
    params = songName;    
    spotify.search({ type: "track", query: params}, function(err, data) {
        if(!err){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); // calling log function
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
}
//////////////////////////////////////////////////////////////
//FUNCTION 5: doWhatitSays////////////////////////////////////
//////////////////////////////////////////////////////////////
//make sure 1st line in random.txt is spotify-this-song,"I Want it That Way"
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);

        } else {
            console.log("Error occurred in random.txt file" + error);
        }
    });
};
//////////////////////////////////////////////////////////////
//FUNCTION 6: Log Results in log.txt file/////////////////////
//////////////////////////////////////////////////////////////
// Log Results: open the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
    fs.appendFile("log.txt", logResults, (error) =>{
        if(error) {
          throw error;
        } else {
          console.log("Content Added!");
        }
    });
}