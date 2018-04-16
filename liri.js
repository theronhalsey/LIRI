require("dotenv").config();

var keys = require('./keys');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require("fs");

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

var myTweets = function () {
    var params = { screen_name: 'sergeant_sailor' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < 10; i++) {
                console.log(tweets[i].created_at + '\n' + tweets[i].text);
            }
        }
    });
};

var spotifyThisSong = function () {
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
    };
};

var movieThis = function () {
    if (process.argv.length > 3) {
        request("https://www.omdbapi.com/?t=" + searchPhrase + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (error) {
                console.log('error:', error);
            }
            var result = JSON.parse(body);
            console.log(result.Title + '\n' + result.Year + '\n' + result.Ratings[0].Value + '\n' + result.Ratings[1].Value + '\n' + result.Country + '\n' + result.Language + '\n' + result.Plot + '\n' + result.Actors);

        });
    } else {
        request("https://www.omdbapi.com/?t=" + 'Mr. Nobody' + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (error) {
                console.log('error:', error);
            }
            var result = JSON.parse(body);
            console.log(result.Title + '\n' + result.Year + '\n' + result.Ratings[0].Value + '\n' + result.Ratings[1].Value + '\n' + result.Country + '\n' + result.Language + '\n' + result.Plot + '\n' + result.Actors);
        });
    };
};

var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var whatItSays = data.split(",");

        switch (whatItSays[0]) {
            case "my-tweets":
                myTweets();
                break;

            case "spotify-this-song":
                if (whatItSays.length > 1) {
                    spotify.search({ type: 'track', query: whatItSays[1] })
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
                };
                break;

            case "movie-this":
                if (whatItSays.length > 1) {
                    request("https://www.omdbapi.com/?t=" + whatItSays[1] + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
                        if (error) {
                            console.log('error:', error);
                        }
                        var result = JSON.parse(body);
                        console.log(result.Title + '\n' + result.Year + '\n' + result.Ratings[0].Value + '\n' + result.Ratings[1].Value + '\n' + result.Country + '\n' + result.Language + '\n' + result.Plot + '\n' + result.Actors);

                    });
                } else {
                    request("https://www.omdbapi.com/?t=" + 'Mr. Nobody' + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
                        if (error) {
                            console.log('error:', error);
                        }
                        var result = JSON.parse(body);
                        console.log(result.Title + '\n' + result.Year + '\n' + result.Ratings[0].Value + '\n' + result.Ratings[1].Value + '\n' + result.Country + '\n' + result.Language + '\n' + result.Plot + '\n' + result.Actors);
                    });
                };
                break;

            default:
                console.log("I am not a very smart bot and only understand 'my-tweets', 'spotify-this-song + <search terms>', 'movie-this + <search terms>', and 'do-what-it-says'.")
        };

    });
};

var jenkins = function () {
    console.log("LEEROOOOY JENKIIINS!");
}

switch (command) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    case "jenkins":
        jenkins();
        break;

    default:
        console.log("I am not a very smart bot and only understand 'my-tweets', 'spotify-this-song + <search terms>', 'movie-this + <search terms>', and 'do-what-it-says'.")
};

fs.appendFile("log.txt", command + ': ' + searchPhrase + '\n', function (err) {
    if (err) {
        return console.log(err);
    }
});