const Quiz = require('../models/quizModel');

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getQuiz = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createQuiz = async (req, res) => {
    const { questions } = req.body;

    try {
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ errors: [{ msg: 'At least one question is required', param: 'questions' }] });
        }

        const validationErrors = [];

        questions.forEach((question, index) => {
            const { questionText, options, examTime } = question;

            if (!questionText || typeof questionText !== 'string') {
                validationErrors.push({ msg: `Invalid questionText for question ${index + 1}`, param: `questions[${index}].questionText` });
            }

            if (!Array.isArray(options) || options.length < 2) {
                validationErrors.push({ msg: `At least two options are required for question ${index + 1}`, param: `questions[${index}].options` });
            }

            if (!options.some(option => option.isCorrect)) {
                validationErrors.push({ msg: `At least one correct answer is required for question ${index + 1}`, param: `questions[${index}].options` });
            }

            if (typeof examTime !== 'string') {
                validationErrors.push({ msg: `Invalid examTime for question ${index + 1}`, param: `questions[${index}].examTime` });
            }
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const newQuiz = new Quiz({ questions });
        await newQuiz.save();
        res.json(newQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.deleteQuiz = async (req, res) => {
    const { quizId } = req.params;

    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
