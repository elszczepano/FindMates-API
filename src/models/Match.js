import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const matchSchema = mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 1 field is required.']
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User 2 field is required.']
    }
}, {
    timestamps: true
});

matchSchema.plugin(mongooseDelete, { deletedAt : true });
matchSchema.plugin(mongooseDelete, { overrideMethods: true });

module.exports = mongoose.model('Match', matchSchema, 'matches');