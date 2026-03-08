import { body, param } from 'express-validator';

export const idParam = [
    param('id').isInt({ gt: 0 }).withMessage('id must be a positive integer')
];

export const upsertChallenge = [
    body('gameType').isString().isLength({ min: 1, max: 255 }).withMessage('Game Type must be a string between 1-255 characters'),
    body('senderId').isInt({ gt: 0 }).withMessage('Sender id must be a positive integer'),
    body('receiverId').isInt({ gt: 0 }).withMessage('Sender id must be a positive integer'),
];