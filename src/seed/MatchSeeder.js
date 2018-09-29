import mongoose from 'mongoose';
import Match from '../models/Match';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const match = new Match({
    user1Id: user1Id,
    user2Id: user2Id
});
match.save().then(() => mongoose.disconnect()).catch(err => console.log(err));