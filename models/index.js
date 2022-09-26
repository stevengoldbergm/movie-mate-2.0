const Movie = require('./movie')
const Review = require('./review')
const User = require('./user')

User.hasMany(Review,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(User,{
    foreignKey:'user_id'
});

Movie.hasMany(Review, {
    foreignKey:'movie_id'
})

Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
})

module.exports = {Movie, Review, User}