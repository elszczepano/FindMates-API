import faker from 'faker';
import mongoose from 'mongoose';
import Message from '../models/Message';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });

const userId = mongoose.Types.ObjectId();
const matchId = mongoose.Types.ObjectId();

const message = new Message({
    message: faker.lorem.sentence(),
    userId: userId,
    matchId: matchId
});
message.save()
    .then(() => mongoose.disconnect())
    .then(() => console.log('Message seed succesfully'))
    .catch(err => console.log(err));