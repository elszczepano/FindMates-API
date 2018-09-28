import faker from 'faker';
import mongoose from 'mongoose';
import User from '../models/User';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });

const user = new User({
    name: faker.name.firstName(),
    password: faker.lorem.word(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    gender: 'male',
    birthDate: faker.date.past(),
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude(),
    pictures: [
        faker.image.image(),
        faker.image.image(),
        faker.image.image()
    ],
    description: faker.lorem.sentence(),
    snapchat: faker.lorem.word(),
    instagram: faker.lorem.word(),
    purpose: 'New friends',
});

user.save().then(() => mongoose.disconnect()).catch(err => console.log(err));