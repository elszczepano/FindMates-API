import { Router } from 'express';
import privilegedUsersController from "../controllers/privilegedUsersController";
import jwtAuth from "../middlewares/auth";
import checkPrivileges from "../middlewares/checkPrivileges";

const api = Router();

api.get('/',
    jwtAuth,
    checkPrivileges,
    privilegedUsersController.getAll
);
api.get('/:id',
    jwtAuth,
    checkPrivileges,
    privilegedUsersController.getOne
);
api.post('/',
    jwtAuth,
    checkPrivileges,
    privilegedUsersController.createNew
);
api.put('/:id',
    jwtAuth,
    checkPrivileges,
    privilegedUsersController.updateOne
);
api.delete('/:id',
    jwtAuth,
    checkPrivileges,
    privilegedUsersController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;