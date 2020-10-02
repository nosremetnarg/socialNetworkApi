const { Schema, model } = require('mongoose'); // import dependencies. Schema constructor and model function
const moment = require('moment');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            require: true,
            unique: true,
            match: /.+\@.+\..+/
        },


        thoughts:
            [{ type: Schema.Types.ObjectId, ref: 'Thought' }],


        friends:
            [{ type: Schema.Types.ObjectId, ref: 'User' }],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.