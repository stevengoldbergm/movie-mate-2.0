const router = require('express').Router();
// const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('main', { search: true})
});

router.post('/', (req, res) => {
    res.render('main', { search: true })
})

router.get('/movie-details', (req, res) => {
    const movieData = {
        title: "Movie Title Placeholder", 
        actor: "Movie Actors Placeholder", 
        director: "Movie Directors Placeholder",
        mpaRating: "MPA Rating Placeholder",
        releaseDate: "Movie Release Date Placeholder",
        reviewScore: "Movie Review Score Placeholder",
        userReviewScore: "Movie User Review Score Placeholder",
        genre: "Movie Genre Placeholder",
        writer: "Movie Writers Placeholder",
        plotSummary: "Movie Plot Summary Placeholder",
        posterURL: "https://via.placeholder.com/480x720",
        ytEmbed: "https://www.youtube.com/embed/C0DPdy98e4c"
    }

    // res.send('index') // sends the index.html file from Public (not necessary anymore)
    // res.render('main', { layout: 'index' });
    res.render('movieDetails', { search: true, movieDetails: true, movieData }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
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
