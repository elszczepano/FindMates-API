import User from '../models/User';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res) {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        return res.status(200).json({
            success: true,
            message: 'User signed in successfully.',
            token: token
        });
    },

    async register(req, res) {
        const {name, email, phone, gender, birthDate, purpose, password, geometry} = req.body;
        let profilePicture = '';
        if(req.file) {
            profilePicture = req.file.path;
        }
        const user = new User({name, email, password, phone, gender, birthDate, purpose, profilePicture, geometry});
        const detailsToShow = (({ _id, name, email, profilePicture, geometry }) => ({ _id, name, email, profilePicture, geometry }))(user);
        try {
            await User.register(user, password);
            return res.status(201).json({
                success: true,
                message: 'User registered successfully.',
                user: detailsToShow
            });
        }
        catch(err) {
            return res.status(409).json(err);
        }
    }
};
