import express from "express";
import messagesController from "../controllers/messagesController";

const router = express.Router();

router.get('/messages',
    messagesController.getAll
);
router.get('/messages/:id',
    messagesController.getOne
);
router.post('/messages/',
    messagesController.createNew
);
router.put('/messages/:id',
    messagesController.updateOne
);
router.delete('/messages/:id',
    messagesController.deleteOne
);

module.exports = router;