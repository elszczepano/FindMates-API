import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const pendingMatchSchema = mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 1 field is required.']
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 2 field is required.']
    },
    user1Approval: Boolean,
    user2Approval: Boolean
}, {
    timestamps: true
});

pendingMatchSchema.plugin(mongooseDelete, { deletedAt : true });
pendingMatchSchema.plugin(mongooseDelete, { overrideMethods: true });

const PendingMatch = module.exports = mongoose.model('PendingMatch', pendingMatchSchema, 'pendingMatches');