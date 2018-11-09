import { Router } from 'express';
import pendingMatchesController from "../controllers/pendingMatchesController";
import jwtAuth from "../middlewares/auth";
import { validateCreate, validateUpdate } from "../validators/pendingMatchesValidator";
import { checkValidation } from "../validators/checkValidation";
import checkPrivileges from "../middlewares/checkPrivileges";

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    pendingMatchesController.getAll
);
api.get('/:id',
    jwtAuth,
    pendingMatchesController.getOne
);
api.post('/',
    jwtAuth,
    validateCreate,
    checkValidation,
    pendingMatchesController.createNew
);
api.put('/:id',
    jwtAuth,
    validateUpdate,
    checkValidation,
    pendingMatchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    pendingMatchesController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;