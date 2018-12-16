import mongoose from 'mongoose';

const pendingMatchSchema = mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 1 field is required.'],
        set: () => this.user1
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 2 field is required.'],
        set: () => this.user2
    },
    user1Approval: Boolean,
    user2Approval: Boolean,
    deletedAt: Date
}, {
    timestamps: true
});

const PendingMatch = module.exports = mongoose.model('PendingMatch', pendingMatchSchema, 'pendingMatches');