import { Router } from 'express';
import errorTicketController from '../controllers/errorTicketController';
import jwtAuth from '../middlewares/auth';
import checkPrivileges from '../middlewares/checkPrivileges';
import { validateCreate } from '../validators/errorTicketsValidator';
import { checkValidation } from '../validators/checkValidation';

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    errorTicketController.getAll
);

api.get('/:id',
    jwtAuth,
    checkPrivileges,
    errorTicketController.getOne
);

api.get('/users/:id',
    jwtAuth,
    checkPrivileges,
    errorTicketController.getOne
);

api.post('/',
    jwtAuth,
    validateCreate,
    checkValidation,
    errorTicketController.createNew
);

api.delete('/:id',
    jwtAuth,
    checkPrivileges,
    errorTicketController.deleteOne
);

module.exports = api;