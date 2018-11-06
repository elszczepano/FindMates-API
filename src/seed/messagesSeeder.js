import faker from 'faker';
import mongoose from 'mongoose';
import Message from '../models/Message';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
Message.deleteMany({}, err=> console.log(err));

const recipientId = mongoose.Types.ObjectId();
const senderId = mongoose.Types.ObjectId();
const matchId = mongoose.Types.ObjectId();

const message = new Message({
    message: faker.lorem.sentence(),
    recipientId: recipientId,
    senderId: senderId,
    matchId: matchId
});
message.save()
    .then(() => mongoose.disconnect())
    .then(() => console.log('Message seed successfully.'))
    .catch(err => console.log(err));