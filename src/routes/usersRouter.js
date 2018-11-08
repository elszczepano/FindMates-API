import { Router } from 'express';
import jwtAuth from '../middlewares/auth';
import checkOwnership from '../middlewares/checkOwnership';
import checkPrivileges from "../middlewares/checkPrivileges";
import usersController from "../controllers/usersController";
import { validateUserUpdate } from "../validators/usersValidator";
import { checkValidation } from "../validators/checkValidation";

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    usersController.getAll
);
api.get('/:id',
    jwtAuth,
    usersController.getOne
);
api.put('/:id',
    jwtAuth,
    checkOwnership,
    validateUserUpdate,
    checkValidation,
    usersController.updateOne
);
api.delete('/:id',
    jwtAuth,
    checkOwnership,
    usersController.deleteOne
);

module.exports = api;