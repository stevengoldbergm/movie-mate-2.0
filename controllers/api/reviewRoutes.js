const router = require('express').Router();
const { User, Review } = require('../../models');
// Placeholder for future authenticaion with passport. Will need to add to post and delte routes below. 
const withAuth = require('../../utils/auth');

// get route for testing to be moved
router.get('/', async (req,res) => {
  try {
    const reviewData = await Review.findAll({
      include: [{ model: User,}],
    });
  res.status(200).json(reviewData)
} catch (err) {
  res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
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

module.exports = router;
