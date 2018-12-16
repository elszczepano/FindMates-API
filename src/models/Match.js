import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
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
    deletedAt: Date
}, {
    timestamps: true
});

const Match = module.exports = mongoose.model('Match', matchSchema, 'matches');