
import NavBar from '../components/NavBar';
import { Container, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import quize from '../assets/images/quiz.jpg';
import { Link } from 'react-router-dom';
import QuizDetail from '../components/QuizDetail';

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
                                            <Link to={`/schedule/${quiz._id}`}>
                                            <button
                                                className='border border-slate-800 mt-3 w-[250px] p-3 pl-5 pr-5 text-slate-900 rounded-xl hover:bg-slate-800 hover:text-white'
                                                
                                            >
                                                Start Quize {index + 1}
                                            </button>
                                            </Link>

                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* {selectedQuiz && (
                                <div className="bg-white rounded-md overflow-hidden shadow-md mb-4 p-8 w-[800px]">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Question: {selectedQuiz.question}</h2>
                                    <div className="mb-2">
                                        <p className="text-gray-700 font-bold">Options:</p>
                                        <ul className="list-disc pl-5">
                                            {selectedQuiz.options.map((option, index) => (
                                                <li key={index} className="text-gray-700">{option}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className="text-gray-700 mb-2">Correct Answer: {selectedQuiz.correctAnswer}</p>
                                    <p className="text-gray-700">Exam Time: {selectedQuiz.examTime}</p>
                                </div>
                            )} */}

                            <QuizDetail />

                        </div>
                    </div>
                </Col>
            </div>
        </Container>
    );
};

export default Schedule