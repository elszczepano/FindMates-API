import { Router } from 'express';
import usersController from "../controllers/usersController";

const api = Router();

api.get('/',
    usersController.getAll
);
api.get('/:id',
    usersController.getOne
);
api.post('/',
    usersController.createNew
);
api.put('/:id',
    usersController.updateOne
);
api.delete('/:id',
    usersController.deleteOne
);

module.exports = api;