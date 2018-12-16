import faker from 'faker';
import mongoose from 'mongoose';
import User from '../models/User';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
User.deleteMany({}, err=> console.log(err));

const user = new User({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    gender: 'male',
    birthDate: faker.date.past(),
    geometry: {
        coordinates: [52.406374, 16.9251681]
    },
    pictures: [
        faker.image.image(),
        faker.image.image(),
        faker.image.image()
    ],
    profilePicture: faker.image.image(),
    description: faker.lorem.sentence(),
    snapchat: faker.lorem.word(),
    instagram: faker.lorem.word(),
    purpose: 'Friends',
});

const register = new Promise((resolve, reject) => {
    User.register(user, 'test', (err, account) => {
        if(err) {
            reject(err);
        }
        resolve('User seed successfully.');
    });
});
register.then(res => {
    console.log(res);
    mongoose.disconnect();
}).catch(err => console.log(err));


