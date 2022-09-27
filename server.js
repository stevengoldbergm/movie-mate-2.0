// Import express
const path = require('path')
const express = require('express');
// PLACEHOLDER: const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers')
// PLACEHOLDER: const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');
// PLACEHOLDER: const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Define port value
const app = express();
const PORT = process.env.PORT || 3001;;

// Set the view engine to handlebars
// note to review with team
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index'
}));

// Define static content
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

// Simple GET check
// app.get('/', (req, res) => {
//     // res.send('index') // sends the index.html file from Public (not necessary anymore)
//     // res.render('main', { layout: 'index' });
//     res.render('signUp', { search: false }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
// });

// // Return movie details
// app.get('/movie-details', (req, res) => {
//     const movieData = {
//         title: "Movie Title Placeholder", 
//         actor: "Movie Actors Placeholder", 
//         director: "Movie Directors Placeholder",
//         mpaRating: "MPA Rating Placeholder",
//         releaseDate: "Movie Release Date Placeholder",
//         reviewScore: "Movie Review Score Placeholder",
//         userReviewScore: "Movie User Review Score Placeholder",
//         genre: "Movie Genre Placeholder",
//         writer: "Movie Writers Placeholder",
//         plotSummary: "Movie Plot Summary Placeholder",
//         posterURL: "https://via.placeholder.com/480x720",
//         ytEmbed: "https://www.youtube.com/embed/C0DPdy98e4c"
//     }

//     // res.send('index') // sends the index.html file from Public (not necessary anymore)
//     // res.render('main', { layout: 'index' });
//     res.render('movieDetails', { search: true, movieData }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
// });

// Listen for the PORT
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port# ${PORT}!`));
  });
