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
    const { question, options, correctAnswer, examTime } = req.body;

    try {
        const newQuiz = new Quiz({ question, options, correctAnswer, examTime });
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
