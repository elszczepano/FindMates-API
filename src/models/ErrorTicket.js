import mongoose from 'mongoose';

const errorTicketsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User field is required.']
    },
    message: {
        type: String,
        required: [true, 'Message field is required.']
    },
    deletedAt: Date
}, {
    timestamps: true
});

const ErrorTicket = module.exports = mongoose.model('ErrorTicket', errorTicketsSchema, 'errorTickets');