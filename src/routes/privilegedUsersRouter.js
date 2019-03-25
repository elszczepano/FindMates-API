import { Router } from 'express';
import privilegedUserController from '../controllers/privilegedUserController';
import jwtAuth from '../middlewares/auth';
import { validateCreate, validateUpdate } from '../validators/privilegedUsersValidator';
import { checkValidation } from '../validators/checkValidation';
import checkPrivileges from '../middlewares/checkPrivileges';

const api = Router();

api.get('/',
	jwtAuth,
	privilegedUserController.getAll
);

api.get('/:id',
	jwtAuth,
	privilegedUserController.getOne
);

api.get('/users/:id',
	jwtAuth,
	privilegedUserController.getResourcesOfUser
);

api.post('/',
	jwtAuth,
	checkPrivileges,
	validateCreate,
	checkValidation,
	privilegedUserController.createNew
);

api.put('/:id',
	jwtAuth,
	checkPrivileges,
	validateUpdate,
	checkValidation,
	privilegedUserController.updateOne
);

api.delete('/:id',
	jwtAuth,
	checkPrivileges,
	privilegedUserController.deleteOne
);

module.exports = api;