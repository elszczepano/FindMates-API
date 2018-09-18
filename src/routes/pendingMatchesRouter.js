import express from 'express';
import pendingMatchesController from "../controllers/pendingMatchesController";

const router = express.Router();

router.get('/',
    pendingMatchesController.getAll
);
router.get('/:id',
    pendingMatchesController.getOne
);
router.post('/',
    pendingMatchesController.createNew
);
router.put('/:id',
    pendingMatchesController.updateOne
);
router.delete('/:id',
    pendingMatchesController.deleteOne
);

module.exports = router;