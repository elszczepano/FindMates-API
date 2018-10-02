import { Router } from 'express';
import pendingMatchesController from "../controllers/pendingMatchesController";

const api = Router();

api.get('/',
    pendingMatchesController.getAll
);
api.get('/:id',
    pendingMatchesController.getOne
);
api.post('/',
    pendingMatchesController.createNew
);
api.put('/:id',
    pendingMatchesController.updateOne
);
api.delete('/:id',
    pendingMatchesController.deleteOne
);

module.exports = api;