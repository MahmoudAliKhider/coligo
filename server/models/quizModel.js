const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
    },
    options: [String],
    correctAnswer: {
        type: String,
        required: true,
    },
    examTime: {
        type: String,
        required: true,
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
