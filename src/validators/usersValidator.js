import { check } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import User from '../models/User';
import moment from 'moment';

exports.validateRegister = [
    check('name').trim().not().isEmpty().withMessage('Name is required.'),
    check('password').trim().not().isEmpty().withMessage('Password is required.'),
    check('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    check('email').trim().not().isEmpty().withMessage('E-mail is required.'),
    check('email').trim().custom(value => {
        return User.find({'email': value}).then(user => {
            if (user.length) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('email').trim().isEmail().withMessage('Invalid e-mail address.'),
    check('phone').trim().not().isEmpty().withMessage('Phone number is required.'),
    check('gender').trim().not().isEmpty().withMessage('Gender is required.'),
    check('birthDate').trim().not().isEmpty().withMessage('Date of birth is required.'),
    check('birthDate').trim().custom(value => moment(value, 'YYYY-MM-DD').isValid()).withMessage('Invalid date of birth.'),
    check('pictures').optional().isArray().withMessage('Invalid data format. Pass images in an array.'),
    check('pictures').optional().custom(value => value.length <=3).withMessage('You can add up to 3 pictures.'),
    check('purpose').trim().not().isEmpty().withMessage('Purpose is required.'),
    check('purpose').trim().isIn(['Friends', 'Dating', 'For fun', 'Sex', 'Other']).withMessage('Invalid purpose.'),
    check('geometry').trim().not().isEmpty().withMessage('Geometry is required.'),
    check('geometry').custom(value => typeof value === 'object' && value.hasOwnProperty('coordinates')).withMessage('Invalid data format. Pass coordinates in an object.'),
    sanitizeBody('*').escape()
];

exports.validateUserUpdate = [
    check('name').optional().trim().not().isEmpty().withMessage('Name cannot be empty.'),
    check('password').optional().trim().not().isEmpty().withMessage('Password cannot be empty.'),
    check('password').optional().trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    check('email').optional().trim().not().isEmpty().withMessage('E-mail cannot be empty.'),
    check('email').optional().trim().isEmail().withMessage('Invalid e-mail address.'),
    check('phone').optional().trim().not().isEmpty().withMessage('Phone number cannot be empty.'),
    check('gender').optional().trim().not().isEmpty().withMessage('Gender cannot be empty.'),
    check('birthDate').optional().trim().not().isEmpty().withMessage('Date of birth cannot be empty.'),
    check('birthDate').optional().trim().custom(value => moment(value, 'YYYY-MM-DD').isValid()).withMessage('Invalid date of birth.'),
    check('pictures').optional().isArray().withMessage('Invalid data format.'),
    check('pictures').optional().custom(value => value.length <=3).withMessage('You can add up to 3 pictures.'),
    check('purpose').optional().trim().not().isEmpty().withMessage('Purpose is required.'),
    check('purpose').optional().trim().isIn(['Friends', 'Dating', 'For fun', 'Sex', 'Other']).withMessage('Invalid purpose.'),
    check('geometry').optional().trim().not().isEmpty().withMessage('Geometry is required.'),
    check('geometry').optional().custom(value => typeof value === 'object' && value.hasOwnProperty('coordinates')).withMessage('Invalid data format. Pass coordinates in an object.'),
    sanitizeBody('*').escape()
];