import { Router } from "express";
import authController from "../controllers/authController";
import loginCheck from "../middlewares/loginCheck";
import {validate, checkValidation} from "../validators/usersValidator";

const api = Router();

api.post('/login', loginCheck, authController.login);
api.post('/register',
    validate,
    checkValidation,
    authController.register
);

module.exports = api;