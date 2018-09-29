import mongoose from 'mongoose';

const pendingMatchSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    matchId: {
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

const PendingMatch = module.exports = mongoose.model('PendingMatch', pendingMatchSchema, 'pendingMatches');