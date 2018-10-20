import mongoose from 'mongoose';

const pendingMatchSchema = mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User 1 ID field is required.']
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User 2 ID field is required.']
    },
    user1Approval: Boolean,
    user2Approval: Boolean,
    deletedAt: Date
}, {
    timestamps: true
});

const PendingMatch = module.exports = mongoose.model('PendingMatch', pendingMatchSchema, 'pendingMatches');