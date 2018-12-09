import { Router } from "express";
import authController from "../controllers/authController";
import loginCheck from "../middlewares/loginCheck";
import upload from "../middlewares/uploadImage";
import { validateRegister } from "../validators/usersValidator";
import { checkValidation } from "../validators/checkValidation";

const api = Router();

api.post('/login', loginCheck, authController.login);
api.post('/register',
    upload.single('profilePicture'),
    validateRegister,
    checkValidation,
    authController.register
);

module.exports = api;