const sequelize = require('../config/connection');
const {User} = require('../models');

const userData = require('./userData.json');
//const reviewData = require('./reviewData.json');
//const movieData = require('./movieData.json');

const seedDatabase = async() => {
    await sequelize.sync ({force:true});

    const users = await User.create (userData,{
        individualHooks:true, 
        returning:true,
});
process.exit(0);
};

seedDatabase ();
