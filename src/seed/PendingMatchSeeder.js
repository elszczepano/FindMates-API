import mongoose from 'mongoose';
import PendingMatch from '../models/PendingMatch';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });
PendingMatch.deleteMany({}, err=> console.log(err));

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const pendingMatch1 = new PendingMatch({
    user1Id: user1Id,
    user2Id: user2Id,
    user1Approval: true
});
const pendingMatch2 = new PendingMatch({
    user1Id: user2Id,
    user2Id: user1Id,
    user1Approval: false,
    user2Approval: true
});

pendingMatch1.save()
    .then(() => mongoose.disconnect())
    .then(() => console.log('Pending match number 1 seed succesfully'))
    .catch(err => console.log(err));
pendingMatch2.save()
    .then(() => mongoose.disconnect())
    .then(() => console.log('Pending match number 2 seed succesfully'))
    .catch(err => console.log(err));