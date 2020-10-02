const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/users', userRoutes);
router.use('/throughts', thoughtRoutes);

module.exports = router;