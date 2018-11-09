import { Router } from "express";
import matchesController from "../controllers/matchesController";
import jwtAuth from "../middlewares/auth";
import checkPrivileges from "../middlewares/checkPrivileges";
import { validateCreate, validateUpdate } from "../validators/matchesValidator";
import { checkValidation } from "../validators/checkValidation";

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    matchesController.getAll
);
api.get('/:id',
    jwtAuth,
    matchesController.getOne
);
api.post('/',
    jwtAuth,
    validateCreate,
    checkValidation,
    matchesController.createNew
);
api.put('/:id',
    jwtAuth,
    checkPrivileges,
    validateUpdate,
    checkValidation,
    matchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    matchesController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;