import passport from 'passport';
import User from '../models/User';

export default () => {
    passport.use(User.createStrategy())
}