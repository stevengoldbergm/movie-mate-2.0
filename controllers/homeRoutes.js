const router = require('express').Router();
const axios = require('axios');
// const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('main', { search: true})
});

router.post('/', (req, res) => {
    res.render('main', { search: true })
})

// Pull a specific review
router.get('/reviews/:id', (req, res) => {
    // reviewObj = Fetch for specific review based on id param
    res.render('review', reviewObj);
})

router.get('/movie-details/:imdbID', async (req, res) => {
    // movieData should be a fetch based on the omdbID param

    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?i=' // change t to s if you want a list of similar movie names
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'

    const searchValue = req.params.imdbID // Working
    console.log(searchValue);

    const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey

    movieData = await axios.get(searchResult)
    movieData = movieData.data;
    console.log(movieData) // Working

    // Pull Rotten Tomatoes from movieData.Ratings
    rtScore = movieData.Ratings[1]
    if (rtScore) {
        rtScore = JSON.stringify(rtScore.Value)
    } else {
        rtScore = "N/A"
    }

    // console.log(rtScore.Value) // Working

    res.render('movieDetails', { search: true, movieDetails: true, movieData, rtScore }); 
});

// User profile page
router.get('/profile', (req, res) => {
    res.render('profile', { layout: 'user', search: false,  })
});

// User sign-up page
router.get('/sign-up', (req, res) => {
    res.render('signUp', { layout: 'user', search: false })
});

// User login page
router.get('/login', (req, res) => {
    res.render('login', { layout: 'user', search: false })
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
