const router = require('express').Router();
const { User, Review } = require('../../models');


// get route for testing to be moved
router.get('/', async (req,res) => {
  try {
    const userData = await User.findAll({
      include: [Review],
    });
  res.status(200).json(userData)
} catch (err) {
  res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        // placeholder for use ID from session: user_id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
