import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const GeoSchema = mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

function arrayLimit(val) {
    return val.length <= 3;
}

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
        required: [true, 'Email field is required.']
    },
    phone: {
        type: String,
        required: [true, 'Phone field is required.']
    },
    gender: {
        type: String,
        required: [true, 'Gender field is required.']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth date field is required.']
    },
    geometry: GeoSchema,
    pictures: {
        type: Array,
        validate: [arrayLimit, '{PATH} exceeds the limit of 3']
    },
    profilePicture: String,
    description: String,
    snapchat: String,
    instagram: String,
    typeOfAccount: {
        type: String,
        required: [true, 'Type of account field is required.'],
        default: 'Free',
    },
    purpose: {
        type: String,
        required: [true, 'Purpose field is required.']
    },
    deletedAt: Date
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = module.exports = mongoose.model('User', userSchema, 'users');