import {  useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Quiz {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  examTime: string;
}

const QuizDetail = () => {
  
  const parame = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const isCorrectAnswer = selectedAnswer === selectedQuiz?.correctAnswer;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  useEffect(()=>{
    const handleShowQuiz = async () => {
        try {
          const res = await fetch(`/api/quiz/quizzes/${parame.quizId}`);
          const data = await res.json();
    
          if (data.success === false) {
            return;
          }
    
          setSelectedQuiz(data);
        } catch (error) {
          console.log(error);
        }
      };
      handleShowQuiz();
  },[parame.quizId])
  

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md mb-4 p-8 w-[800px]">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Question: {selectedQuiz?.question}
      </h2>

      <form>
        {selectedQuiz?.options.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              id={option}
              name="quizOption"
              value={option}
              checked={selectedAnswer === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={option} className="ml-2">
              {option}
            </label>
          </div>
        ))}
      </form>

      <button
        className="bg-green-500 text-white p-2 rounded-md mt-4"
        onClick={handleShowResults}
      >
        Submit
      </button>

      {showResults && (
        <div className="mt-4">
          <p>Your selected answer: {selectedAnswer}</p>
          <p>Correct answer: {selectedQuiz?.correctAnswer}</p>
          <p>{isCorrectAnswer ? 'Correct!' : 'Incorrect!'}</p>
        </div>
      )}
    </div>
  );
};

export default QuizDetail;
