import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Email field is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone field is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender field is required']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date field is required']
    },
    longitude: {
        type: String
    },
    latitude: {
        type: String
    },
    pictures: {
        type: Array
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
        required: [true, 'Type of account field is required'],
        default: 'Free',
    },
    purpose: {
        type: String,
        required: [true, 'Purpose field is required']
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose(), {usernameField: 'email'});

const User = module.exports = mongoose.model('User', userSchema, 'users');