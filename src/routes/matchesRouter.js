import {Router} from 'express';
import matchController from '../controllers/matchController';
import jwtAuth from '../middlewares/auth';
import checkPrivileges from '../middlewares/checkPrivileges';
import {validateCreate, validateUpdate} from '../validators/matchesValidator';
import {checkValidation} from '../validators/checkValidation';

const api = Router();
api.get('/',
	jwtAuth,
	checkPrivileges,
	matchController.getAll
);

api.get('/:id',
	jwtAuth,
	matchController.getOne
);

api.get('/users/:id',
	jwtAuth,
	matchController.getResourcesOfUser
);

api.post('/',
	jwtAuth,
	checkPrivileges,
	validateCreate,
	checkValidation,
	matchController.createNew
);

api.put('/:id',
	jwtAuth,
	checkPrivileges,
	validateUpdate,
	checkValidation,
	matchController.updateOne
);

api.delete('/:id',
	jwtAuth,
	matchController.deleteOne
);

module.exports = api;
