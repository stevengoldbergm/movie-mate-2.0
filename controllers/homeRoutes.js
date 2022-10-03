const router = require('express').Router();
const axios = require('axios');
const { json } = require('express');
const { User, Review } = require('../models');
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
router.get('/reviews/:imdbId',withAuth, async (req, res) => {

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

    try {
        let movieData = await axios.get(searchResult);
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
        try {
            const ytResult = await axios.get(ytSearchResult)
            const ytEmbedId = ytResult.data.items[0].id.videoId
            const ytEmbed = ytEmbedBase + ytEmbedId;
    
            // console.log('\n\ndata.items:',ytResult.data.items[0].id.videoId,'\n\n'); // Working
            // console.log(ytResult); // Working
    
            res.render('movieDetails', { search: false, movieDetails: true, movieData, rtScore, ytEmbed, loggedIn: req.session.logged_in, imdbID: req.params.imdbID }); 
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            };
        };

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        };
    };
});

// // User profile page
// router.get('/profile', withAuth, (req, res) => {
//     res.render('profile', { layout: 'user', search: false, loggedIn: req.session.logged_in, email: req.session.email  })
// });

// test profile page
router.get('/profile', withAuth, async (req, res) => {
    console.log('testing');
    const testData = await User.findOne({
        where: {
            email: req.session.email
        }
    });
    console.log('\n\n\n', testData, '\n\n\n')


    res.render('profile', { layout: 'user', search: false, loggedIn: req.session.logged_in, email: req.session.email  })
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