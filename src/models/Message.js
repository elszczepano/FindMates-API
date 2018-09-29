import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
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

const Message = module.exports = mongoose.model('Message', messageSchema, 'messages');