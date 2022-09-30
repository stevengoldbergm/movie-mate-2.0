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
    const omdbSearch = 'https://www.omdbapi.com/?i=' // change t to s if you want a list of similar movie names
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'

    const searchValue = req.params.imdbID // Working
    console.log(searchValue);

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

    console.log('\n\ndata.items:',ytResult.data.items[0].id.videoId,'\n\n');
    // console.log(ytResult);
    // const ytEmbed = 

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


// ---------- Reference code ---------- //

// router.get('/', async (req, res) => {
//   try {
//     // Get all posts and JOIN with user data
//     const post = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/post/:id', async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render('post', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });
