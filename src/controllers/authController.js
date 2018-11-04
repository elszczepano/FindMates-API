import User from '../models/User';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res, next) {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        return res.status(200).json({
            success: true,
            message: "User signed in successfully.",
            token: token
        });
    },

    async register(req, res, next) {
    const {name, email, phone, gender, birthDate, purpose, password} = req.body;
    const user = new User({name, email, password, phone, gender, birthDate, purpose});
    try {
        await User.register(user, password);
        res.status(201).json({
            success: true,
            message: "User registered successfully."
        });
    }
    catch(err) {
        return res.status(409).json(err);
    }
    }
}
