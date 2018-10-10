import { Router } from "express";
import messagesController from "../controllers/messagesController";
import jwtAuth from "../middlewares/auth";

const api = Router();
//TODO - ACL - Administrator access only
api.get('/',
    jwtAuth,
    messagesController.getAll
);
//TODO - Check if id of owner === id of current user
api.get('/:id',
    jwtAuth,
    messagesController.getOne
);
api.post('/',
    jwtAuth,
    messagesController.createNew
);
//TODO - Check if id of owner  === id of current user
api.put('/:id',
    jwtAuth,
    messagesController.updateOne
);
//TODO - Check if id of owner === id of current user
api.delete('/:id',
    jwtAuth,
    messagesController.deleteOne
);

module.exports = api;