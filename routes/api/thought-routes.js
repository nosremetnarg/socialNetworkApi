const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id') //:id means params
    .get(getThoughtById)
//     .put(updateThought)
//     .delete(deleteThought);

module.exports = router;