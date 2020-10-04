const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ // linking documents in other collections
                path: 'reactions', // accesses reactions 
                select: '-__v'
            })
            .select('-__v') // excludes the v data info
            .sort({ _id: -1 })
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // post a new Thought
    createThought({ body }, res) {
        console.log("this is written by " , body)
        // destructuring body
        Thought.create(body) // create is a Mongoose method
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    },
    // get single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id }) // destructured params
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbData => {
                // If no thought is found, send 404
                if (!dbData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
}

module.exports = thoughtController;