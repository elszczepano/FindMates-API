import {check} from "express-validator/check";
import {sanitizeBody} from "express-validator/filter";

exports.validateCreate = [
    check('user1Id').trim().not().isEmpty().withMessage('First user ID is required.'),
    check('user2Id').trim().not().isEmpty().withMessage('Second user ID is required.'),
    check('user1Id').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('First user ID must be an ID.'),
    check('user2Id').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Second user ID must be an ID.'),
    sanitizeBody('*').escape()
];

exports.validateUpdate = [
    check('user1Id').optional().trim().not().isEmpty().withMessage('First user ID cannot be empty.'),
    check('user2Id').optional().trim().not().isEmpty().withMessage('Second user ID cannot be empty.'),
    check('user1Id').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('First user ID must be an ID.'),
    check('user2Id').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Second user ID must be an ID.'),
    sanitizeBody('*').escape()
];