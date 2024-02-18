import React from 'react';
import {useSelector} from "react-redux";

const UserResults = () => {
    const authorizedUser = useSelector(state => state.authorizedUserReducer); // авторизований користувач
    const userResults = useSelector(state => {
        const user = state.quizzesDataReducer.find(user => user.id === authorizedUser.id);
        return user ? user.quizResults : null;
    });
    console.log('userResults', userResults);

    return (
        <>
            {userResults !== null ? (
                <div className="container-box">
                    <h2>Результати користувача {authorizedUser.login} </h2>
                    <table className="table table-light table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Категорія</th>
                            <th scope="col">Складність</th>
                            <th scope="col">Правильні відповіді</th>
                            <th scope="col">Набрані бали</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userResults.map((result, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{result.date}</td>
                                    <td>{result.theme}</td>
                                    <td>{result.difficulty}</td>
                                    <td>{result.correctAnswers}</td>
                                    <td>{result.totalScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>Результатів не знайдено.</h1>
            )}
        </>
    );

};

export default UserResults;
