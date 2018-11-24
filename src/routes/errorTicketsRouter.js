import { Router } from "express";
import errorTicketsController from "../controllers/errorTicketsController";
import jwtAuth from "../middlewares/auth";
import checkPrivileges from "../middlewares/checkPrivileges";
import { validateCreate } from "../validators/errorTicketsValidator";
import { checkValidation } from "../validators/checkValidation";

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    errorTicketsController.getAll
);
api.get('/:id',
    jwtAuth,
    checkPrivileges,
    errorTicketsController.getOne
);
api.get('/users/:id',
    jwtAuth,
    checkPrivileges,
    errorTicketsController.getOne
);
api.post('/',
    jwtAuth,
    validateCreate,
    checkValidation,
    errorTicketsController.createNew
);

api.delete('/:id',
    jwtAuth,
    checkPrivileges,
    errorTicketsController.deleteOne
);

module.exports = api;