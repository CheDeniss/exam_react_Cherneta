import React from 'react';
import {useSelector} from "react-redux";

const UserRating = () => {
    const userResults = useSelector(state => state.quizzesDataReducer);
    const users = useSelector(state => state.registeredUsersReducer);

    const resultsData = useSelector(state => {
        const result = [];
        userResults.forEach(item => {
            const { id, quizResults } = item;
            let totalScore = 0;
            quizResults.forEach(resultItem => {
                totalScore += resultItem.totalScore;
            });
            result.push({ id, totalScore });
        });
        return [...result].sort((a, b) => b.totalScore - a.totalScore);
    });

    const getUserLoginById = (id) => {
        const user = users.find(user => user.id === id);
        return user.login;
    };

    return (
        <>
            {resultsData !== null ?(
                <div className="container-box">
                    <h2>Рейтинг користувачів</h2>

                    <table className="table table-light table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Місце</th>
                            <th scope="col">Користувач</th>
                            <th scope="col">Бали</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultsData.map((result, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{getUserLoginById(result.id)}</td>
                                <td>{result.totalScore}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                    <h1>Завантаження...</h1>
                )
            }
        </>
    );
};

export default UserRating;
