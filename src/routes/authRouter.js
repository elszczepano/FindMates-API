import { Router } from "express";
import authController from "../controllers/authController";
import loginCheck from "../middlewares/loginCheck";
import { validateRegister } from "../validators/usersValidator";
import { checkValidation } from "../validators/checkValidation";

const api = Router();

api.post('/login', loginCheck, authController.login);
api.post('/register',
    validateRegister,
    checkValidation,
    authController.register
);

module.exports = api;