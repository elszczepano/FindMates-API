import { Router } from 'express';
import pendingMatchesController from "../controllers/pendingMatchesController";
import jwtAuth from "../middlewares/auth";

const api = Router();
//TODO - ACL - Administrator access only
api.get('/',
    jwtAuth,
    pendingMatchesController.getAll
);
api.get('/:id',
    jwtAuth,
    pendingMatchesController.getOne
);
api.post('/',
    jwtAuth,
    pendingMatchesController.createNew
);
//TODO - Check if id of owner  === id of current user
api.put('/:id',
    jwtAuth,
    pendingMatchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    pendingMatchesController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;