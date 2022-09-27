// Import express
const express = require('express');
const app = express();
const path = require('path')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

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
    res.render('main', { search: true }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
});

// Enables use of api routes
app.use(routes);

// Listen for the PORT
app.listen(PORT, () => {
    console.log(`App listening on port# ${PORT}!`)
});