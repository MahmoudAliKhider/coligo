const { body, validationResult } = require('express-validator');

const createQuizValidation = [
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('questions.*.questionText').notEmpty().withMessage('Question is required'),
  body('questions.*.options').isArray({ min: 2 }).withMessage('At least two options are required'),
  body('questions.*.options.*.optionText').notEmpty().withMessage('Option text is required'),
  body('questions.*.options.*.isCorrect').isBoolean().withMessage('isCorrect should be a boolean'),
  body('questions.*.examTime').isString().notEmpty().withMessage('Exam time is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = createQuizValidation;
