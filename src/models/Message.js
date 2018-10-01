import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Message field is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID field is required']
    },
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Match ID field is required']
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

const Message = module.exports = mongoose.model('Message', messageSchema, 'messages');