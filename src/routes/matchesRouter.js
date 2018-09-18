import express from "express";
import matchesController from "../controllers/matchesController";

const router = express.Router();

router.get('/',
    matchesController.getAll
);
router.get('/:id',
    matchesController.getOne
);
router.post('/',
    matchesController.createNew
);
router.put('/:id',
    matchesController.updateOne
);
router.delete('/:id',
    matchesController.deleteOne
);

module.exports = router;