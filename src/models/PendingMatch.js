import mongoose from 'mongoose';

const pendingMatchSchema = mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    approved: {
        type: Boolean
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