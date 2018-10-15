import { Router } from "express";
import messagesController from "../controllers/messagesController";
import jwtAuth from "../middlewares/auth";

const api = Router();
//TODO - ACL - Administrator access only
api.get('/',
    jwtAuth,
    messagesController.getAll
);
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
api.delete('/:id',
    jwtAuth,
    messagesController.deleteOne
);
//TODO - Add route to resources of user
//TODO - Add route to resources of matchId

module.exports = api;