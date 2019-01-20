import { Router } from "express";
import authController from "../controllers/authController";
import loginCheck from "../middlewares/loginCheck";
import checkIfBlocked from "../middlewares/checkIfBlocked";
import upload from "../middlewares/uploadImage";
import { validateRegister } from "../validators/usersValidator";
import { checkValidation } from "../validators/checkValidation";
import jwtAuth from "../middlewares/auth";

const api = Router();

api.get('/', (req, res) => {
    res.status(200).json('Welcome to FindMates API.');
});

api.get('/me',
    jwtAuth, (req, res) => {
    res.status(200).json(req.user);
});

api.post('/login',
    loginCheck,
    checkIfBlocked,
    authController.login
);

api.post('/register',
    upload.single('profilePicture'),
    validateRegister,
    checkValidation,
    authController.register
);

module.exports = api;