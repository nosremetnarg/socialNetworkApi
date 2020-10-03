const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// add prefix of `/user` to routes created in `user-routes.js`
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;