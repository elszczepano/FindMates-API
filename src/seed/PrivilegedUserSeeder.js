import mongoose from 'mongoose';
import PrivilegedUser from '../models/PrivilegedUser';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
PrivilegedUser.deleteMany({}, err=> console.log(err));

const userId = mongoose.Types.ObjectId();

const privilegedUser = new PrivilegedUser({
    userId: userId,
    role: 'Administrator'
});
privilegedUser.save()
    .then(() => mongoose.disconnect())
    .then(() => console.log('Privileged user seed successfully.'))
    .catch(err => console.log(err));