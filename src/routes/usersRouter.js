import express from 'express';
import usersController from "../controllers/usersController";

const router = express.Router();

router.get('/users',
    usersController.getAll
);
router.get('/users/:id',
    usersController.getOne
);
router.post('/users/',
    usersController.createNew
);
router.put('/users/:id',
    usersController.updateOne
);
router.delete('/users/:id',
    usersController.deleteOne
);

module.exports = router;