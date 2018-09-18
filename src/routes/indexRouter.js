import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json('Welcome to FindMates API');
});

module.exports = router;