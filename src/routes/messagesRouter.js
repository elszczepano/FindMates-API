import express from "express";
import messagesController from "../controllers/messagesController";

const router = express.Router();

router.get('/',
    messagesController.getAll
);
router.get('/:id',
    messagesController.getOne
);
router.post('/',
    messagesController.createNew
);
router.put('/:id',
    messagesController.updateOne
);
router.delete('/:id',
    messagesController.deleteOne
);

module.exports = router;