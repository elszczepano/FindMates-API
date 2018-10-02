import { Router } from "express";
import messagesController from "../controllers/messagesController";

const api = Router();

api.get('/',
    messagesController.getAll
);
api.get('/:id',
    messagesController.getOne
);
api.post('/',
    messagesController.createNew
);
api.put('/:id',
    messagesController.updateOne
);
api.delete('/:id',
    messagesController.deleteOne
);

module.exports = api;