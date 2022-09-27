// Import express
const express = require('express');
const app = express();

// Define port value
const PORT = process.env.PORT || 3001;;

// Import handlebars
const handlebars = require('express-handlebars');
// Set the view engine to handlebars
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index'
}));

// Define static content
app.use(express.static('public'));

// Simple GET check
app.get('/', (req, res) => {
    // res.send('index') // sends the index.html file from Public (not necessary anymore)
    // res.render('main', { layout: 'index' });
    res.render('signUp', { search: true }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
});

// Return movie details
app.get('/movie-details', (req, res) => {
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
    res.render('movieDetails', { search: true, movieData }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
});

// Listen for the PORT
app.listen(PORT, () => {
    console.log(`App listening on port# ${PORT}!`)
});