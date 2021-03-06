const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
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
    // get single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id }) // destructured params
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbData => {
                // If no user is found, send 404
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // post a new user
    createUser({ body }, res) { // destructuring body
        User.create(body) // create is a Mongoose method
            .then(dbData => res.json(dbData))
            .catch(err => res.status(400).json(err));
    },
    // put update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id }) // another Mongoose method
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },
    // // POST Add Friend to User
    addNewFriendById({ params }, res) { // destructuring body
        // console.log("****ADD FRIEND", body, params.id)
        User.findOneAndUpdate(
                    { _id: params.id },
                    { $push: { friends: params.id } },
                    { new: true })
            
            
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    },

    // // put update user friend by id
    deleteFriendById({ params }, res) { // destructuring body
        // console.log("****ADD FRIEND", body, params.id)
        User.findOneAndDelete({ _id: params.id })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },
}

module.exports = userController;