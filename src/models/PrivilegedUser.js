import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const privilegedUserSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'User field is required.']
    },
    role: {
        type: String,
        required: [true, 'Role field is required.'],
        default: 'User'
    }
}, {
    timestamps: true
});

privilegedUserSchema.plugin(mongooseDelete, { deletedAt : true });
privilegedUserSchema.plugin(mongooseDelete, { overrideMethods: true });

const PrivilegedUser = module.exports = mongoose.model('PrivilegedUser', privilegedUserSchema, 'privilegedUsers');