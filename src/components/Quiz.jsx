import React, {useEffect, useState} from 'react';
import {clearQuizQuestions, clearThematic, fetchQuizQuestions, setQuizResults} from '../actions/ActionCreater';
import {useDispatch, useSelector} from "react-redux";
import ProgressLine from "./ProgressLine.jsx";
import QuizQuestion from "./QuizQuestion.jsx";
import { v4 as uuidv4 } from 'uuid';
import Loader from "./Loader.jsx";
import '../index.css'

const Quiz = () => {
    const dispatch = useDispatch();

    const questions = useSelector(state => state.quizQuestionsReducer); // питання
    const authorizedUser = useSelector(state => state.authorizedUserReducer); // авторизований користувач
    const responseCodeFromAPI = useSelector(state => state.quizQuestionsReducer.response_status); // код відповіді від API

    const userChoice = useSelector(state => state.thematicReducer.userChoice); // вибір теми і скалдності користувачем
    const theme = userChoice ? userChoice.theme : "Випадковий вибір";
    const difficulty = userChoice ? userChoice.difficulty : "Випадковий вибір";
    const type = 'multiple' // тип відповідей на питання

    const [score, setScore] = useState(0) //бал за минулу відповідь
    const [totalScore, setTotalScore] = useState(0) // поточний сумарний бал
    const [answers, setAnswers] = useState([]) // поточні відповіді юзера
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0) // індекс поточного питання
    const [wrongCount, setWrongCount] = useState(0) // кількість помилок
    const [wasSaved, setWasSaved] = useState(false) // чи були збережені результати


    useEffect(() => {
        console.log('userChoice -> ', userChoice)
        if(userChoice) {  // якщо користувач вибрав тему
            console.log('запит вікторини за вибором користувача');
            dispatch(fetchQuizQuestions({
                amount: 12,
                category: userChoice.themeId,
                difficulty: difficulty,
                type: type
            }))
        }
        else {  // якщо користувач не вибрав тему
            console.log('запит випадкових вікторин');
            dispatch(fetchQuizQuestions())
        }

        return () => {
            console.log('useEffect return - очистка вікторини та вибору тем');
            dispatch(clearQuizQuestions())
            dispatch(clearThematic())
        }
    }, []);

    const handleAnswer = (selectedAnswer, isCorrect) => {
        console.log('selectedAnswer:', selectedAnswer);
        console.log('isCorrect:', isCorrect);
        const updatedAnswers = [...answers, selectedAnswer];
        setAnswers(updatedAnswers);
        (isCorrect) ? setTotalScore(totalScore + score): setWrongCount(wrongCount + 1)
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleSaveResults = () => {
        const gameId = uuidv4()
        const dataPack = {
            quizId: gameId,
            date: new Date().toLocaleString(),
            difficulty: difficulty,
            theme: theme,
            correctAnswers: answers.length - wrongCount,
            totalScore: totalScore
        }

        dispatch(setQuizResults(authorizedUser.id, dataPack))
    }

    if(currentQuestionIndex === 12 && !wasSaved){
        setWasSaved(true)
        handleSaveResults()
    }


    if (questions.error !== null) {
        return <h1>ERROR - {questions.error}</h1>;
    }


    return (
        <>
            {responseCodeFromAPI === 0 ? (
                <div className="container-box">
                    {answers.length === questions.questions.length ? (
                        <>
                            <h1>Результат гри:</h1>
                            <table className="table table-light table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Питання</th>
                                    <th scope="col">Ваша відповідь</th>
                                    <th scope="col">Правильна відповідь</th>
                                </tr>
                                </thead>
                                <tbody>
                                {questions.questions.map((question, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{decodeURIComponent(question.question)}</td>
                                        <td>
                                            {answers[i] === question.correct_answer ? (
                                                <span style={{ color: 'green' }}>✔ </span>
                                            ) : (
                                                <span style={{ color: 'red' }}>✖ </span>
                                            )}
                                            {decodeURIComponent(answers[i])}
                                        </td>
                                        <td>{decodeURIComponent(question.correct_answer)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <h1>Ваші бали: {totalScore}</h1>
                        </>
                    ) : (
                        <div>
                            <h3> Помилок: {wrongCount}</h3>
                            {questions.questions.map((question, i) => {
                                if (i === currentQuestionIndex) {
                                    return (
                                        <div key={i}>
                                            <ProgressLine index={i} OnSetScore={(score) => setScore(score)} />
                                            <QuizQuestion question={question} OnAnswerOut={handleAnswer} />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div className="container-box">
                    {responseCodeFromAPI !== null && (
                        <>
                            <h1>Відповідь сервера - {responseCodeFromAPI}</h1>
                            {(() => {
                                switch (responseCodeFromAPI) {
                                    case 1:
                                        return <h1>Немає результатів - API не вдалося повернути результати.</h1>;
                                    case 2:
                                        return <h1>Помилка в запиті - недійсний параметр.</h1>;
                                    case 3:
                                        return <h1>Маркер не знайдено Маркер сеансу не існує.</h1>;
                                    case 4:
                                        return <h1>Токен порожній.</h1>;
                                    case 5:
                                        return <h1>Обмеження швидкості Надійшло забагато запитів. Кожен IP може отримати доступ до API лише раз на 5 секунд.</h1>;
                                    default:
                                        return <Loader />;
                                }
                            })()}
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Quiz

