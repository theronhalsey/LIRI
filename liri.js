require("dotenv").config();

var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

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
    console.log(command);
    spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });

} else if (command === 'movie-this') {

} else if (command === 'do-what-it-says') {

} else {
    console.log("I am not a very smart bot and only understand 'my-tweets', 'spotify-this-song', 'movie-this', and 'do-what-it-says'.")
};