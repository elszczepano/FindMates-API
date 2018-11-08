import { check } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

exports.validateRegister = [
    check('name').trim().not().isEmpty().withMessage('Name is required.'),
    check('password').trim().not().isEmpty().withMessage('Password is required.'),
    check('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    check('email').trim().not().isEmpty().withMessage('E-mail is required.'),
    check('email').trim().isEmail().withMessage('Invalid e-mail address.'),
    check('phone').trim().not().isEmpty().withMessage('Phone number is required.'),
    check('gender').trim().not().isEmpty().withMessage('Gender is required.'),
    check('birthDate').trim().not().isEmpty().withMessage('Date of birth is required.'),
    check('birthDate').trim().matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).withMessage('Invalid date of birth.'),
    check('pictures').optional().isArray().withMessage('Invalid data format.'),
    check('purpose').trim().not().isEmpty().withMessage('Purpose is required.'),
    sanitizeBody('*').escape()
];

