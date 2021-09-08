const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        username: {
            type: String,
            require: true
        },
        
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const ThoughtSchema = new Schema (
    {
        username: {
            type: String,
            required: true
        },

        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },

        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        
    }
)

//reactionCount virtual that retrieves the length of the user's friends array field on query

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;