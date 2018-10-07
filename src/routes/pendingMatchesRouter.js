import { Router } from 'express';
import pendingMatchesController from "../controllers/pendingMatchesController";
import jwtAuth from "../middlewares/auth";

const api = Router();

api.get('/',
    jwtAuth,
    pendingMatchesController.getAll
);
api.get('/:id',
    jwtAuth,
    pendingMatchesController.getOne
);
api.post('/',
    jwtAuth,
    pendingMatchesController.createNew
);
api.put('/:id',
    jwtAuth,
    pendingMatchesController.updateOne
);
api.delete('/:id',
    jwtAuth,
    pendingMatchesController.deleteOne
);

module.exports = api;