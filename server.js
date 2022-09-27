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

// Simple GET check
app.get('/', (req, res) => {
    // res.send('index') // sends the index.html file from Public (not necessary anymore)
    // res.render('main', { layout: 'index' });
    res.render('main', { search: true }); // I no longer have to specify the layout, since the default layout is set above! I can still set specific layouts if desired
});

// Enables use of api routes
app.use(routes);

// Listen for the PORT
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port# ${PORT}!`));
  });
