import API from '../../testsConfig';
import mongoose from 'mongoose';
import User from '../models/User';

mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
User.deleteMany({}, err=> console.log(err));

API.post('register', {
	name: 'John',
	phone: '123 456 789',
	password: 'secret123',
	email: 'john@doe.com',
	gender: 'male',
	birthDate: '1992-12-04',
	purpose: 'Friends'
}).then(() => {
	console.log('User seed successfully.');
	mongoose.disconnect();
}).catch(err => console.log(err));
