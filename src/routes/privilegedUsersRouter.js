import { Router } from 'express';
import privilegedUsersController from "../controllers/privilegedUsersController";
import jwtAuth from "../middlewares/auth";
import { validateCreate, validateUpdate } from "../validators/privilegedUsersValidator";
import { checkValidation } from "../validators/checkValidation";
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
    privilegedUsersController.getResourcesOfUser
);
api.post('/',
    jwtAuth,
    checkPrivileges,
    validateCreate,
    checkValidation,
    privilegedUsersController.createNew
);
api.put('/:id',
    jwtAuth,
    checkPrivileges,
    validateUpdate,
    checkValidation,
    privilegedUsersController.updateOne
);
api.delete('/:id',
    jwtAuth,
    checkPrivileges,
    privilegedUsersController.deleteOne
);

module.exports = api;