import { Router } from 'express';
import pendingMatchController from '../controllers/pendingMatchController';
import jwtAuth from '../middlewares/auth';
import { validateCreate, validateUpdate } from '../validators/pendingMatchesValidator';
import { checkValidation } from '../validators/checkValidation';
import checkPrivileges from '../middlewares/checkPrivileges';

const api = Router();
api.get('/',
	jwtAuth,
	checkPrivileges,
	pendingMatchController.getAll
);

api.get('/:id',
	jwtAuth,
	checkPrivileges,
	pendingMatchController.getOne
);

api.get('/users/:id',
	jwtAuth,
	checkPrivileges,
	pendingMatchController.getResourcesOfUser
);

api.post('/',
	jwtAuth,
	validateCreate,
	checkValidation,
	pendingMatchController.createNew
);

api.put('/:id',
	jwtAuth,
	validateUpdate,
	checkValidation,
	pendingMatchController.updateOne
);

api.delete('/:id',
	jwtAuth,
	pendingMatchController.deleteOne
);

module.exports = api;