import User from '../models/User';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res, next) {

        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {expiresIn: 3600});

        return res.status(200).json({
            message: "User signed in successfully.",
            token: token
        });
    },

    async register(req, res, next) {
    const {name, email, phone, gender, birthDate, purpose, password} = req.body;
    const user = new User({name, email, password, phone, gender, birthDate, purpose});
    await User.register(user, password);

    res.status(201).json({
        success: true,
        message: "User registered successfully."
    });
    }
}
