const router = require('express').Router();
const axios = require('axios');
const { json } = require('express');
const withAuth = require('../utils/auth')
const apiRoutes = require('./api')
router.use('/api', apiRoutes)
// const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('main', { search: true, loggedIn: req.session.logged_in})
});

// Pull a specific review

router.get('/review', (req, res) => {
    res.render('review', {layout: 'user', loggedIn: req.session.logged_in});
})

// Pull a specific movie's reviews
router.get('/reviews/:imdbId', async (req, res) => {

    res.render('review', {layout: 'user', loggedIn: req.session.logged_in});
});

router.get('/movie-details/:imdbID', async (req, res) => {
    // ---------- Search OMDB for data ---------- //

    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?i=' // Search by imdbId
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'

    const searchValue = req.params.imdbID // Working
    // console.log(searchValue); // Working

    const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey

    movieData = await axios.get(searchResult)
    movieData = movieData.data;
    // console.log(movieData) // Working

    // Pull Rotten Tomatoes from movieData.Ratings
    rtScore = movieData.Ratings[1]
    if (rtScore) {
        rtScore = JSON.stringify(rtScore.Value)
        rtScore = rtScore.substring(1, 4)
    } else {
        rtScore = "N/A"
    }
    // console.log(rtScore.Value) // Working

    // ---------- Search Youtube for trailer ---------- //

    // Youtube Search Variables
    const youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
    // var youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s' // Steve's Key
    const ytSearch = 'https://youtube.googleapis.com/youtube/v3/search?q='
    const plusTrailer = " movie trailer"
    const ytApiKey = '&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
    const ytPart = '&part=snippet'
    const ytType = '&type=video'
    const ytResults = '&maxResults=1'
    const ytEmbedBase = 'https://www.youtube.com/embed/'
    const title = movieData.Title
    const year = movieData.Year
    // Define youtube search
    var ytSearchResult = ytSearch + title + " " + year + plusTrailer + ytPart + ytType + ytResults + ytApiKey

    // Fetch youtube data
    const ytResult = await axios.get(ytSearchResult)
    const ytEmbedId = ytResult.data.items[0].id.videoId
    const ytEmbed = ytEmbedBase + ytEmbedId;

    // console.log('\n\ndata.items:',ytResult.data.items[0].id.videoId,'\n\n'); // Working
    // console.log(ytResult); // Working

    res.render('movieDetails', { search: false, movieDetails: true, movieData, rtScore, ytEmbed, loggedIn: req.session.logged_in, imdbID: req.params.imdbID }); 
});

// User profile page
router.get('/profile', withAuth, (req, res) => {
    res.render('profile', { layout: 'user', search: false, loggedIn: req.session.logged_in  })
});

// User sign-up page
router.get('/sign-up', (req, res) => {
    res.render('signUp', { layout: 'user', search: false, loggedIn: req.session.logged_in })
});

// User login page
router.get('/login', (req, res) => {
    res.render('login', { layout: 'user', search: false, loggedIn: req.session.logged_in })
});

module.exports = router;