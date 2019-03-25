import {check} from 'express-validator/check';
import {sanitizeBody} from 'express-validator/filter';

exports.validateCreate = [
	check('message').trim().not().isEmpty().withMessage('Message is required.'),
	check('user').trim().not().isEmpty().withMessage('User ID is required.'),
	check('user').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('User ID must be an ID.'),
	sanitizeBody('*').escape()
];
