import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Message field is required.']
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender ID field is required.']
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recipient ID field is required.']
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: [true, 'Match ID field is required.']
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Message = module.exports = mongoose.model('Message', messageSchema, 'messages');