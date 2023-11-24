import NavBar from '../components/NavBar';
import { Container, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import quize from '../assets/images/quiz.jpg';

interface Option {
    _id: string;
    optionText: string;
    isCorrect: boolean;
}

interface Question {
    _id: string;
    questionText: string;
    options: Option[];
    examTime: string;
}

interface Quiz {
    _id: string;
    questions: Question[];
}

const Schedule = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

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
                                            <p className="text-gray-700">Exam Time: {quiz.questions[0]?.examTime}</p>
                                            <button
                                                className='border border-slate-800 mt-3 w-[250px] p-3 pl-5 pr-5 text-slate-900 rounded-xl hover:bg-slate-800 hover:text-white'
                                                onClick={() => handleShowQuiz(quiz._id)}
                                            >
                                                Start Quiz {index + 1}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedQuiz && (
                                <div className="bg-white rounded-md overflow-hidden shadow-md mb-4 p-8 w-[800px]">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        Quiz Details for {selectedQuiz._id}
                                    </h2>

                                    {selectedQuiz.questions.map((question, questionIndex) => (
                                        <div key={question._id} className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-700 mb-2">
                                                Question {questionIndex + 1}: {question.questionText}
                                            </h3>

                                            <ul className="list-disc ml-6">
                                                {question.options.map((option) => (
                                                    <li
                                                        key={option._id}
                                                        className={`mb-2 ${option.isCorrect ? 'text-green-500 font-bold' : 'text-gray-800'
                                                            }`}
                                                    >
                                                        {option.optionText} {option.isCorrect && '(Correct)'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                </div>
                            )}


                        </div>
                    </div>
                </Col>
            </div>
        </Container>
    );
};

export default Schedule;
