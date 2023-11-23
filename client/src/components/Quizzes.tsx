import { useEffect, useState } from 'react';
import  quize  from '../assets/images/quiz.jpg'
interface Quiz {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    examTime: string;
}

export const Quizzes = () => {
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
        <div>
            <h6 className="text-2xl font-bold  text-slate-800">Quizzes</h6>

            {loading && <p>Loading...</p>}
            {error && <p>Error fetching quizzes</p>}

            {quizzes && quizzes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 ">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-4 p-8 w-[300px]">
                        <p className='text-slate-700 font-bold relative ml-[230px] cursor-pointer'>All</p>

                        {quizzes.slice(0, 2).map((quiz, index) => (
                            <div key={quiz._id} className="mb-4">
                                {/* <h4 className="text-xl font-bold text-gray-900 mb-2">Question: {quiz.question}</h4> */}
                                {/* <p className="text-gray-700 mb-2">Options: {quiz.options.join(', ')}</p> */}
                                {/* <p className="text-gray-700 mb-2">Correct Answer: {quiz.correctAnswer}</p> */}

                                <img src={quize} alt='quize'/>
                                <p className="text-gray-700">Exam Time: {quiz.examTime}</p>
                                <button className='border border-slate-800 mt-3 w-[250px] p-3 pl-5 pr-5 text-slate-900 rounded-xl hover:bg-slate-800 hover:text-white '>
                                    Start Quize{index + 1}
                                </button>
                                <hr className="my-4 border-t border-gray-300" />

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
};
