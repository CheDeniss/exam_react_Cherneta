import React, { useEffect, useState } from 'react';
import './CSSS/QuizQuestion.css';

const QuizQuestion = ({ question, OnAnswerOut }) => {
    const [questionArr, setQuestionArr] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        const answers = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);
        setQuestionArr(answers);
    }, [question]);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === question.correct_answer;
        console.log(isCorrect, ' ->  ', answer, ' --- ', question.correct_answer);
        setTimeout(() => {
            OnAnswerOut(answer, isCorrect)
        }, 700);
    };

    return (
        <div className='quiz-question-container'>
            <h2>{decodeURIComponent(question.question)}</h2>
            <ul className="list-group">
                {questionArr.map((answer, index) => (
                    <li className={`list-group-item item-style ${
                            (selectedAnswer === '' && 'list-group-item-action list-group-item-light') ||
                            (question.correct_answer === answer
                                ? 'list-group-item-success'
                                : 'list-group-item-danger')
                        }`}
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                    >
                        {decodeURIComponent(answer)}
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default QuizQuestion;
