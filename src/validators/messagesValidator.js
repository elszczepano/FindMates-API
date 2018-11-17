import {check} from "express-validator/check";
import {sanitizeBody} from "express-validator/filter";

exports.validateCreate = [
    check('message').trim().not().isEmpty().withMessage('Message is required.'),
    check('sender').trim().not().isEmpty().withMessage('Sender ID is required.'),
    check('recipient').trim().not().isEmpty().withMessage('Recipient ID is required.'),
    check('match').trim().not().isEmpty().withMessage('Match ID is required.'),
    check('sender').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Sender ID must be an ID.'),
    check('recipient').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Recipient ID must be an ID.'),
    check('match').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Match ID must be an ID.'),
    sanitizeBody('*').escape()
];

exports.validateUpdate = [
    check('message').trim().not().isEmpty().withMessage('Message is required.'),
    check('sender').optional().trim().not().isEmpty().withMessage('Sender ID cannot be empty.'),
    check('recipient').optional().trim().not().isEmpty().withMessage('Recipient ID cannot be empty.'),
    check('match').optional().trim().not().isEmpty().withMessage('Match ID cannot be empty.'),
    check('sender').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Sender ID must be an ID.'),
    check('recipient').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Recipient ID must be an ID.'),
    check('match').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Match ID must be an ID.'),
    sanitizeBody('*').escape()
];