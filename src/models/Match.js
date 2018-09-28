import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
    user1Id: {
        type: Number,
        required: true
    },
    user2Id: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    deletedAt: {
        type: Date
    }
});

const Match = module.exports = mongoose.model('Match', matchSchema, 'matches');