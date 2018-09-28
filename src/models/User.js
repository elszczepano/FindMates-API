import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    pictures: {
        type: Array,
        required: true
    },
    description: {
        type: String
    },
    snapchat: {
        type: String
    },
    instagram: {
        type: String
    },
    typeOfAccount: {
        type: String,
        required: true,
        default: 'Free',
    },
    purpose: {
        type: String,
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

const User = module.exports = mongoose.model('User', userSchema, 'users');