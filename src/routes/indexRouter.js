import { Router } from "express";

const api = Router();

api.get('/', (req, res) => {
    res.status(200).json('Welcome to FindMates API.');
});

module.exports = api;