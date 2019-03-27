import mongoose from 'mongoose';
import PendingMatch from '../models/PendingMatch';

mongoose.connect('mongodb://localhost:27017/FindMates', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
PendingMatch.deleteMany({}, err => console.log(err));

const user1 = mongoose.Types.ObjectId();
const user2 = mongoose.Types.ObjectId();

const pendingMatch1 = new PendingMatch({
	user1: user1,
	user2: user2,
	user1Approval: true
});
const pendingMatch2 = new PendingMatch({
	user1: user2,
	user2: user1,
	user1Approval: false,
	user2Approval: true
});

pendingMatch1.save()
	.then(() => mongoose.disconnect())
	.then(() => console.log('Pending match number 1 seed successfully.'))
	.catch(err => console.log(err));
pendingMatch2.save()
	.then(() => mongoose.disconnect())
	.then(() => console.log('Pending match number 2 seed successfully.'))
	.catch(err => console.log(err));
