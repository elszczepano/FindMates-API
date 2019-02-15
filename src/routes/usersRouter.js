import { Router } from 'express';
import jwtAuth from '../middlewares/auth';
import checkOwnership from '../middlewares/checkOwnership';
import checkPrivileges from '../middlewares/checkPrivileges';
import userController from '../controllers/userController';
import upload from '../middlewares/uploadImage';
import { validateUserUpdate } from '../validators/usersValidator';
import { checkValidation } from '../validators/checkValidation';

const api = Router();
api.get('/',
    jwtAuth,
    checkPrivileges,
    userController.getAll
);

api.get('/:id',
    jwtAuth,
    userController.getOne
);

api.get('/find',
    jwtAuth,
    userController.findNearby
);

api.put('/:id',
    jwtAuth,
    checkOwnership,
    validateUserUpdate,
    checkValidation,
    userController.updateOne
);

api.post('/:id/update-profile-picture',
    jwtAuth,
    checkOwnership,
    upload.single('profilePicture'),
    userController.updateProfilePicture
);

api.post('/:id/update-gallery',
    jwtAuth,
    checkOwnership,
    upload.array('pictures', 3),
    userController.updateGallery
);

api.delete('/:id',
    jwtAuth,
    checkOwnership,
    userController.deleteOne
);

module.exports = api;