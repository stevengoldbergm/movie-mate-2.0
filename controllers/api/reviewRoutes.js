const router = require('express').Router();
const { User, Review, Movie } = require('../../models');
// Placeholder for future authenticaion with passport. Will need to add to post and delte routes below. 
const withAuth = require('../../utils/auth');

// get route for testing to be moved
router.get('/', async (req,res) => {
  try {
    const reviewData = await Review.findAll({
      include: [User, Movie],
    });
  res.status(200).json(reviewData)
} catch (err) {
  res.status(500).json(err)
}
});

// Get specific review based on movie ID
router.get('/:movieId', async (req,res) => {
  console.log(`\n\nmovieId: ${req.params.movieId}\n\n`)
  try {
    const reviewData = await Review.findOne({
      where: {
        movie_id: req.params.movieId
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this movie id!' });
      return;
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all reviews based on user ID
router.get('/user/:userId', async (req,res) => {
  console.log(`\n\nuserId: ${req.params.userId}\n\n`)
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.params.userId
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found from this user id!' });
      return;
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id:req.session.user_id
    });
      // placeholder for use ID from session: user_id: req.session.user_id,
      res.status(200).json(newReview);
    } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        // placeholder for use ID from session: user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', async (req, res) => {
  try{
    const reviewData = await Review.update(req.body,{
      where: {
        id:  req.params.id 
      }
    });  
    if(!reviewData){
      res.status(404).json({message:'No review Found With This ID'});
      return;
    }
    
    res.status(200).json(reviewData);
  } catch(err){
    res.status(500).json(err);
  }

})
module.exports = router;
