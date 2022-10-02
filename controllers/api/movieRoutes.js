const router = require('express').Router();
const { Review, Movie } = require('../../models');
// Placeholder for future authenticaion with passport. Will need to add to post and delte routes below. 
const withAuth = require('../../utils/auth');

// get route for testing to be moved
router.get('/', async (req,res) => {
  try {
    const movieData = await Movie.findAll({
      include: [Review],
    });
  res.status(200).json(movieData)
} catch (err) {
  res.status(500).json(err)
}
});

router.post('/',  async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body)
     // placeholder for use ID from session: user_id: req.session.user_id,
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:imdbId',withAuth, async (req,res) => {
  
  try {
    const movieData = await Movie.findOne({
      where: {
        imdb_id: req.params.imdbId
      },
      include: [Review],
    });

    if (!movieData) {
      res.status(404).json({ message: 'No movie found with this id!' });
      return;
    }
    res.status(200).json(movieData);
    console.log(withAuth)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get movie by movie id
router.get('/id/:movieId', async (req,res) => {
  try {
    const movieData = await Movie.findOne({
      where: {
        id: req.params.movieId
      },
    });

    if (!movieData) {
      res.status(404).json({ message: 'No movie found with this id!' });
      return;
    }
    res.status(200).json(movieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// I don't think we want movies to be deleted from our database
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const movieData = await Movie.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!movieData) {
//       res.status(404).json({ message: 'No movie found with this id!' });
//       return;
//     }

//     res.status(200).json(movieData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
