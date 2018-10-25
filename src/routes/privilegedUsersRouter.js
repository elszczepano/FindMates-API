import { Router } from 'express';
import privilegedUsersController from "../controllers/privilegedUsersController";
import jwtAuth from "../middlewares/auth";

const api = Router();

//TODO - ACL - Administrator access only
api.get('/',
    jwtAuth,
    privilegedUsersController.getAll
);
//TODO - ACL - Administrator access only
api.get('/:id',
    jwtAuth,
    privilegedUsersController.getOne
);
//TODO - ACL - Administrator access only
api.post('/',
    jwtAuth,
    privilegedUsersController.createNew
);
//TODO - ACL - Administrator access only
api.put('/:id',
    jwtAuth,
    privilegedUsersController.updateOne
);
//TODO - ACL - Administrator access only
api.delete('/:id',
    jwtAuth,
    privilegedUsersController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;