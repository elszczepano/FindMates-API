import { Router } from "express";
import matchesController from "../controllers/matchesController";
import jwtAuth from "../middlewares/auth";

const api = Router();

api.get('/',
    jwtAuth,
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
    matchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    matchesController.deleteOne
);

module.exports = api;