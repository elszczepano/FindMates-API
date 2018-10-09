import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Message field is required']
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Recepient ID field is required']
    },
    recepientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Recepient ID field is required']
    },
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Match ID field is required']
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Message = module.exports = mongoose.model('Message', messageSchema, 'messages');