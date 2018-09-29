import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
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