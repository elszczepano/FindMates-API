import { Router } from 'express';
import jwtAuth from '../middlewares/auth';
import checkOwnership from '../middlewares/checkOwnership';
import usersController from "../controllers/usersController";

const api = Router();
//TODO - ACL - Administrator access only
api.get('/',
    jwtAuth,
    usersController.getAll
);
api.get('/:id',
    jwtAuth,
    usersController.getOne
);
api.put('/:id',
    jwtAuth,
    checkOwnership,
    usersController.updateOne
);
api.delete('/:id',
    jwtAuth,
    checkOwnership,
    usersController.deleteOne
);

module.exports = api;