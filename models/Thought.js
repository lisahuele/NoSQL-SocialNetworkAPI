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
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
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
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;