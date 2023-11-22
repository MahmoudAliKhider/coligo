const { body, validationResult } = require('express-validator');

const createQuizValidation = [
    body('question').notEmpty().withMessage('Question is required'),
    body('options').isArray({ min: 2 }).withMessage('At least two options are required'),
    body('correctAnswer').notEmpty().withMessage('Correct answer is required'),
    body('examTime')
        .custom((value) => {
            const examTimeInMinutes = parseInt(value, 10);

            if (isNaN(examTimeInMinutes) || examTimeInMinutes <= 0) {
                throw new Error('Invalid exam time');
            }

            if (examTimeInMinutes > 30) {
                throw new Error('Exam time should be 30 minutes or less');
            }

            return true;
        }),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = createQuizValidation;
