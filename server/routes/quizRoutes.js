const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authService = require("../controllers/authController");
const createQuiz = require('../utils/validation/Quiz');

router.get('/quizzes', authService.protect,quizController.getAllQuizzes);
router.get('/quizzes/:quizId', authService.protect,quizController.getQuiz);
router.post('/quizzes', authService.protect, authService.allowedTo('admin'), createQuiz, quizController.createQuiz);
router.delete('/quizzes/:quizId', authService.protect, authService.allowedTo("admin"), quizController.deleteQuiz);

module.exports = router;
