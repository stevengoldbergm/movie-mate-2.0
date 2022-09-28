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
    partialsDir: `${__dirname}/views/partials`,
    extname: 'hbs',
    defaultLayout: 'index'
}));

// Define static content
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

// Listen for the PORT
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port# ${PORT}!`));
  });
