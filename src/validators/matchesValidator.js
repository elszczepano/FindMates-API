import {check} from "express-validator/check";
import {sanitizeBody} from "express-validator/filter";

exports.validateCreate = [
    check('user1').trim().not().isEmpty().withMessage('First user ID is required.'),
    check('user2').trim().not().isEmpty().withMessage('Second user ID is required.'),
    check('user1').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('First user ID must be an ID.'),
    check('user2').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Second user ID must be an ID.'),
    sanitizeBody('*').escape()
];

exports.validateUpdate = [
    check('user1').optional().trim().not().isEmpty().withMessage('First user ID cannot be empty.'),
    check('user2').optional().trim().not().isEmpty().withMessage('Second user ID cannot be empty.'),
    check('user1').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('First user ID must be an ID.'),
    check('user2').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Second user ID must be an ID.'),
    sanitizeBody('*').escape()
];