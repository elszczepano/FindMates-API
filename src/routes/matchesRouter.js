import { Router } from "express";
import matchesController from "../controllers/matchesController";

const api = Router();

api.get('/',
    matchesController.getAll
);
api.get('/:id',
    matchesController.getOne
);
api.post('/',
    matchesController.createNew
);
api.put('/:id',
    matchesController.updateOne
);
api.delete('/:id',
    matchesController.deleteOne
);

module.exports = api;