import {check} from "express-validator/check";
import {sanitizeBody} from "express-validator/filter";

exports.validateCreate = [
    check('message').trim().not().isEmpty().withMessage('Message is required.'),
    check('senderId').trim().not().isEmpty().withMessage('Sender ID is required.'),
    check('recipientId').trim().not().isEmpty().withMessage('Recipient ID is required.'),
    check('matchId').trim().not().isEmpty().withMessage('Match ID is required.'),
    check('senderId').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Sender ID must be an ID.'),
    check('recipientId').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Recipient ID must be an ID.'),
    check('matchId').trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Match ID must be an ID.'),
    sanitizeBody('*').escape()
];

exports.validateUpdate = [
    check('message').trim().not().isEmpty().withMessage('Message is required.'),
    check('senderId').optional().trim().not().isEmpty().withMessage('Sender ID cannot be empty.'),
    check('recipientId').optional().trim().not().isEmpty().withMessage('Recipient ID cannot be empty.'),
    check('matchId').optional().trim().not().isEmpty().withMessage('Match ID cannot be empty.'),
    check('senderId').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Sender ID must be an ID.'),
    check('recipientId').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Recipient ID must be an ID.'),
    check('matchId').optional().trim().matches(/^[0-9a-fA-F]{24}$/).withMessage('Match ID must be an ID.'),
    sanitizeBody('*').escape()
];