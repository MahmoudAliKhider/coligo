
import NavBar from '../components/NavBar';
import { Container, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import quize from '../assets/images/quiz.jpg';
// import { Link } from 'react-router-dom';
// import QuizDetail from '../components/QuizDetail';

interface Quiz {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    examTime: string;
}

const Schedule = () => {

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
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

    const handleShowQuiz = async (quizId: string) => {
        try {
            const res = await fetch(`/api/quiz/quizzes/${quizId}`);
            const data = await res.json();

            if (data.success === false) {
                return;
            }

            setSelectedQuiz(data);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/quiz/quizzes`);
                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setQuizzes(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);


    return (
        <Container fluid>
            <div className='py-3 flex'>
                <Col sm="3" xs="2" md="2" className='w-60'>
                    <NavBar />
                </Col>

                <Col className='ml-16 ' sm="9" xs="10" md="10">
                    <div>
                        <div>
                            <h6 className="text-2xl font-bold text-slate-800">Quizzes</h6>

                            {loading && <p>Loading...</p>}
                            {error && <p>Error fetching quizzes</p>}

                            {quizzes && quizzes.length > 0 && (
                                <div className="flex flex-wrap gap-5 mt-2">
                                    {quizzes.map((quiz, index) => (
                                        <div key={quiz._id} className="bg-white rounded-2xl overflow-hidden shadow-md mb-4 p-8 w-[300px] ml-5">

                                            <img src={quize} alt='quize' />

                                            <p className="text-gray-700">Exam Time: {quiz.examTime}</p>
                                            {/* <Link to={`/schedule/${quiz._id}`}> */}
                                            <button
                                                className='border border-slate-800 mt-3 w-[250px] p-3 pl-5 pr-5 text-slate-900 rounded-xl hover:bg-slate-800 hover:text-white'
                                                onClick={() => handleShowQuiz(quiz._id)}
                                            >
                                                Start Quize {index + 1}
                                            </button>

                                            {/* </Link> */}

                                        </div>
                                    ))}
                                </div>
                            )}

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

                            {/* <QuizDetail /> */}

                        </div>
                    </div>
                </Col>
            </div>
        </Container>
    );
};

export default Schedule