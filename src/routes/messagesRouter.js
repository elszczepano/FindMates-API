import { Router } from 'express';
import messageController from '../controllers/messageController';
import jwtAuth from '../middlewares/auth';
import checkPrivileges from '../middlewares/checkPrivileges';
import { validateCreate, validateUpdate } from '../validators/messagesValidator';
import { checkValidation } from '../validators/checkValidation';

const api = Router();
api.get('/',
	jwtAuth,
	checkPrivileges,
	messageController.getAll
);

api.get('/matches/:id',
	jwtAuth,
	messageController.getResourcesOfMatch
);

api.get('/users/:id',
	jwtAuth,
	messageController.getResourcesOfUser
);

api.get('/:id',
	jwtAuth,
	messageController.getOne
);

api.post('/',
	jwtAuth,
	validateCreate,
	checkValidation,
	messageController.createNew
);

api.put('/:id',
	jwtAuth,
	validateUpdate,
	checkValidation,
	messageController.updateOne
);

api.delete('/:id',
	jwtAuth,
	messageController.deleteOne
);

module.exports = api;