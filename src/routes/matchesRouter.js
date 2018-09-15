import express from "express";
import matchesController from "../controllers/matchesController";

const router = express.Router();

router.get('/matches',
    matchesController.getAll
);
router.get('/matches/:id',
    matchesController.getOne
);
router.post('/matches/',
    matchesController.createNew
);
router.put('/matches/:id',
    matchesController.updateOne
);
router.delete('/matches/:id',
    matchesController.deleteOne
);

module.exports = router;