import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const errorTicketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User field is required.']
    },
    message: {
        type: String,
        required: [true, 'Message field is required.']
    }
}, {
    timestamps: true
});

errorTicketSchema.plugin(mongooseDelete, { deletedAt : true });
errorTicketSchema.plugin(mongooseDelete, { overrideMethods: true });

module.exports = mongoose.model('ErrorTicket', errorTicketSchema, 'errorTickets');