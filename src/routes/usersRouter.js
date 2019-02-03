import { Router } from 'express';
import jwtAuth from '../middlewares/auth';
import checkOwnership from '../middlewares/checkOwnership';
import checkPrivileges from '../middlewares/checkPrivileges';
import usersController from '../controllers/usersController';
import upload from '../middlewares/uploadImage';
import { validateUserUpdate } from '../validators/usersValidator';
import { checkValidation } from '../validators/checkValidation';

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    usersController.getAll
);

api.get('/:id',
    jwtAuth,
    usersController.getOne
);

api.get('/find',
    jwtAuth,
    usersController.findNearby
);

api.put('/:id',
    jwtAuth,
    checkOwnership,
    validateUserUpdate,
    checkValidation,
    usersController.updateOne
);

api.post('/:id/update-profile-picture',
    jwtAuth,
    checkOwnership,
    upload.single('profilePicture'),
    usersController.updateProfilePicture
);

api.post('/:id/update-gallery',
    jwtAuth,
    checkOwnership,
    upload.array('pictures', 3),
    usersController.updateGallery
);

api.delete('/:id',
    jwtAuth,
    checkOwnership,
    usersController.deleteOne
);

module.exports = api;