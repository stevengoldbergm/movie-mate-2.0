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

// route for user sign up
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      req.session.email = req.body.email;
      res.status(200).json(newUser);
    })

    
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get an existing user by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
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

// route to get an existing user by email
router.get('/email/:email', async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: req.params.email,
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

// route to delete an existing user by id
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

// route to update a user by id
router.put('/:id', async (req, res) => {
  try{
    const userData = await User.update(req.body,{
      where: {
        id:  req.params.id 
      }
    });  
    if(!userData){
      res.status(404).json({message:'No User Found With This ID'});
      return;
    }
    
    res.status(200).json(userData);
  } catch(err){
    res.status(500).json(err);
  }

})

// route to enable user login
router.post('/login', async (req,res) => {
  try {
    // getting user data from the database
    const userData = await User.findOne({where: {email: req.body.email}});
    console.log(`User data:${userData}`)
    // errore for no user found
    if(!userData) {
      res.status(400).json({message: 'User not found. Please check email'});
      return;
    }
    // Run check password funciton and set valid password true if sucess
    const validPassword = await userData.checkPassword(req.body.password);
    // Error for invalid password
    if(!validPassword) {
      res.status(400).json({message: 'Password on file does not match'});
      return;
    }
    // Password and email match, create session, set session user id and set login true
    req.session.save(() => {
      req.session.email = req.body.email; // Placeholder for user data variable
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Sucessfully logged in!'});
    })
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// route for a user to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
