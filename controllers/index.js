const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', authRoutes)

module.exports = router;