import { Router } from "express";
import authController from "../controllers/authController";
import passport from 'passport';

const api = Router();

api.post('/login', passport.authenticate('local', { session: false }), authController.login);
api.post('/register', authController.register);

module.exports = api;