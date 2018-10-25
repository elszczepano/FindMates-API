import mongoose from 'mongoose';

const privilegedUserSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: [true, 'User ID field is required.']
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