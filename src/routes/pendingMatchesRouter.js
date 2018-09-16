import express from 'express';
import pendingMatchesController from "../controllers/pendingMatchesController";

const router = express.Router();

router.get('/pending-matches',
    pendingMatchesController.getAll
);
router.get('/pending-matches/:id',
    pendingMatchesController.getOne
);
router.post('/pending-matches/',
    pendingMatchesController.createNew
);
router.put('/pending-matches/:id',
    pendingMatchesController.updateOne
);
router.delete('/pending-matches/:id',
    pendingMatchesController.deleteOne
);

module.exports = router;