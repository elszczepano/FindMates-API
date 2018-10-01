import mongoose from 'mongoose';

const pendingMatchSchema = mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User 1 ID field is required']
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User 2 ID field is required']
    },
    user1Approval: {
        type: Boolean
    },
    user2Approval: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, 'Created at field is required']
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: [true, 'Updated at field is required']
    },
    deletedAt: {
        type: Date
    }
});

const PendingMatch = module.exports = mongoose.model('PendingMatch', pendingMatchSchema, 'pendingMatches');