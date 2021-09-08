const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address' ]
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        
    }
)

//friendCount virtual that retrieves the length of the user's friends array field on query

const User = model('User', UserSchema);

module.exports = User;
