import { Router } from 'express';
import jwtAuth from '../middlewares/auth';
import usersController from "../controllers/usersController";

const api = Router();

api.get('/',
    jwtAuth,
    usersController.getAll
);
api.get('/:id',
    jwtAuth,
    usersController.getOne
);
api.post('/',
    jwtAuth,
    usersController.createNew
);
api.put('/:id',
    jwtAuth,
    usersController.updateOne
);
api.delete('/:id',
    jwtAuth,
    usersController.deleteOne
);

module.exports = api;