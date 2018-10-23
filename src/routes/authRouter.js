import { Router } from "express";
import authController from "../controllers/authController";
import loginCheck from "../middlewares/loginCheck";

const api = Router();

api.post('/login', loginCheck, authController.login);
api.post('/register', authController.register);

module.exports = api;