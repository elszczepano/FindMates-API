import User from '../models/User';

export default {
    async login(req, res, next) {
        return res.status(200).json({
            message: "User signed in succesfully"
        });
    },

    async register(req, res, next) {
    const {name, email, phone, gender, birthDate, purpose, password} = req.body;
    const user = new User({name, email, password, phone, gender, birthDate, purpose});
    await User.register(user, password);

    res.status(201).json({
        success: true,
        message: "User registered succesfully"
    });
    }
}
