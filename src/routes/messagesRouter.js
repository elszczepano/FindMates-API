import { Router } from "express";
import messagesController from "../controllers/messagesController";
import jwtAuth from "../middlewares/auth";
import checkPrivileges from "../middlewares/checkPrivileges";
import { validateCreate, validateUpdate } from "../validators/messagesValidator";
import { checkValidation } from "../validators/checkValidation";

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    messagesController.getAll
);
api.get('/:id',
    jwtAuth,
    messagesController.getOne
);
api.post('/',
    jwtAuth,
    validateCreate,
    checkValidation,
    messagesController.createNew
);
api.put('/:id',
    jwtAuth,
    validateUpdate,
    checkValidation,
    messagesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    messagesController.deleteOne
);
//TODO - Add route to resources of user
//TODO - Add route to resources of matchId

module.exports = api;