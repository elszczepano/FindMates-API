import { Router } from 'express';
import privilegedUsersController from "../controllers/privilegedUsersController";
import jwtAuth from "../middlewares/auth";
import checkPrivileges from "../middlewares/checkPrivileges";

const api = Router();

api.get('/',
    jwtAuth,
    privilegedUsersController.getAll
);
api.get('/:id',
    jwtAuth,
    privilegedUsersController.getOne
);
api.get('/users/:id',
    jwtAuth,
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

module.exports = api;