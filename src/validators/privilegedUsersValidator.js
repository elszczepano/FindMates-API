import {check} from 'express-validator/check';
import {sanitizeBody} from 'express-validator/filter';

exports.validateCreate = [
	check('user').trim().not().isEmpty().withMessage('User ID is required.'),
	check('role').trim().not().isEmpty().withMessage('Role is required.'),
	check('user').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('User ID must be an ID.'),
	sanitizeBody('*').escape()
];

exports.validateUpdate = [
	check('user').optional().trim().not().isEmpty().withMessage('User ID cannot be empty.'),
	check('role').optional().trim().not().isEmpty().withMessage('Role cannot be empty.'),
	check('user').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('User ID must be an ID.'),
	sanitizeBody('*').escape()
];