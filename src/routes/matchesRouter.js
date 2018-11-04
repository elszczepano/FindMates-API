import { Router } from "express";
import matchesController from "../controllers/matchesController";
import jwtAuth from "../middlewares/auth";
import checkPrivileges from "../middlewares/checkPrivileges";

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
    matchesController.createNew
);
api.put('/:id',
    jwtAuth,
    checkPrivileges,
    matchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    matchesController.deleteOne
);

//TODO - Add route to resources of user

module.exports = api;