import mongoose from 'mongoose';
import Match from '../models/Match';

mongoose.connect('mongodb://localhost:27017/FindMates', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
Match.deleteMany({}, err => console.log(err));

const user1 = mongoose.Types.ObjectId();
const user2 = mongoose.Types.ObjectId();

const match = new Match({
	user1: user1,
	user2: user2
});
match.save()
	.then(() => mongoose.disconnect())
	.then(() => console.log('Match seed successfully.'))
	.catch(err => console.log(err));
