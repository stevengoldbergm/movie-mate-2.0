const router = require('express').Router();

const apiRoutes = require('./api');
// Placeholder for front end routes const homeRoutes = require('./homeRoutes');

// Placeholder for front end routes router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;