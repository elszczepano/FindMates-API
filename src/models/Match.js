import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
    user1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 1 ID field is required.']
    },
    user2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 2 ID field is required.']
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Match = module.exports = mongoose.model('Match', matchSchema, 'matches');