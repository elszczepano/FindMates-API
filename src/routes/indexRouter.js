import { Router } from "express";

const api = Router();

api.get('/', (req, res) => {
    res.json('Welcome to FindMates API.');
});

module.exports = api;