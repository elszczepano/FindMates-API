import mongoose from 'mongoose';

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
    },
    deletedAt: Date
}, {
    timestamps: true
});

const PrivilegedUser = module.exports = mongoose.model('PrivilegedUser', privilegedUserSchema, 'privilegedUsers');