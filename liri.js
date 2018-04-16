require("dotenv").config();

var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var searchTerms = [];
var getTerms = function () {
    for (i = 3; i < process.argv.length; i++) {
        searchTerms.push(process.argv[i]);
    }
}
getTerms();
var searchPhrase = searchTerms.join(" ");

if (command === 'my-tweets') {
    var params = { screen_name: 'sergeant_sailor' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < 10; i++) {
                console.log(tweets[i].created_at + '\n' + tweets[i].text);
            }
        }
    });

} else if (command === 'spotify-this-song') {
    if (process.argv.length > 3) {
        spotify.search({ type: 'track', query: searchPhrase })
            .then(function (response) {
                console.log(response.tracks.items[0].artists[0].name + '\n' + response.tracks.items[0].name + '\n' + response.tracks.items[0].external_urls.spotify + '\n' + response.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify.search({ type: 'track', query: 'The Sign' })
            .then(function (response) {
                console.log(response.tracks.items[5].artists[0].name + '\n' + response.tracks.items[5].name + '\n' + response.tracks.items[5].external_urls.spotify + '\n' + response.tracks.items[5].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

} else if (command === 'movie-this') {

} else if (command === 'do-what-it-says') {

} else {
    console.log("I am not a very smart bot and only understand 'my-tweets', 'spotify-this-song', 'movie-this', and 'do-what-it-says'.")
};