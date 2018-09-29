import mongoose from 'mongoose';
import PendingMatch from '../models/PendingMatch';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const pendingMatch1 = new PendingMatch({
    user1Id: user1Id,
    user2Id: user2Id,
    approved: true
});
const pendingMatch2 = new PendingMatch({
    user1Id: user2Id,
    user2Id: user1Id,
    approved: false
});

pendingMatch1.save().then(() => mongoose.disconnect()).catch(err => console.log(err));
pendingMatch2.save().then(() => mongoose.disconnect()).catch(err => console.log(err));