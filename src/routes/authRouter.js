import { Router } from "express";
import authController from "../controllers/authController";

const api = Router();

api.post('/register', authController.register);

module.exports = api;