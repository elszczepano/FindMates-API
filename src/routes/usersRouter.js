import express from 'express';
import usersController from "../controllers/usersController";

const router = express.Router();

router.get('/',
    usersController.getAll
);
router.get('/:id',
    usersController.getOne
);
router.post('/',
    usersController.createNew
);
router.put('/:id',
    usersController.updateOne
);
router.delete('/:id',
    usersController.deleteOne
);

module.exports = router;