import { Router } from "express";
import matchesController from "../controllers/matchesController";
import jwtAuth from "../middlewares/auth";

const api = Router();
//TODO - ACL - Administrator access only
api.get('/',
    jwtAuth,
    matchesController.getAll
);
api.get('/:id',
    jwtAuth,
    matchesController.getOne
);
api.post('/',
    jwtAuth,
    matchesController.createNew
);
//TODO - Check if id of owner === id of current user
api.put('/:id',
    jwtAuth,
    matchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    matchesController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;