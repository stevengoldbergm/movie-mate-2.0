// Import express
const path = require('path')
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers')
// PLACEHOLDER: const helpers = require('./utils/helpers')

// required to set up sessions
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Define port value
const app = express();
const PORT = process.env.PORT || 3001;;

// set up session
const sess = {
  secret: "test secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

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
app.use(express.static('node_modules'));
  
app.use(routes);

// Listen for the PORT
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port# ${PORT}!`));
  });
