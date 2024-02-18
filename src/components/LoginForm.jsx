import React, {useEffect, useState} from 'react';
import './CSSS/LoginForm.css';
import {useDispatch, useSelector} from "react-redux";
import {newUser, setAuth} from "../actions/ActionCreater.jsx";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate()

    const id = uuidv4();
    const dispatch = useDispatch();
    const users = useSelector(state => state.registeredUsersReducer); //усі збережені користувачі

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        const authorizedUser = users.find(user => user.login === login && user.password === password);
        if (!authorizedUser) {
            alert('Користувача з таким логіном чи паролем не знайдено');
        } else {
            dispatch(setAuth(authorizedUser.id, authorizedUser.login));
        }
    };

    const handleRegister = () => {
        const isUser = users.some(user => user.login === login);
        if (isUser) {
            alert('Користувач з таким логіном вже зареєстрований');
        } else {
            dispatch(newUser(id, login, password, birthday))
            dispatch(setAuth(id, login))
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Зупиняємо стандартну поведінку подання форми
        if (isRegistering) {
            handleRegister();
        } else {
            handleLogin();
        }
    };

    useEffect(() => {
        return () => {
            navigate('/about')
        };
    }, []);


    return (
        <form className="logreg-container" onSubmit={handleSubmit}>
            <div className="logreg-form">
                <h1 >{isRegistering ? "Реєстрація" : "Вхід"}</h1>
                <label htmlFor="login" className="form-label">Логін</label>
                <input className="form-control mb-4" required style={{ width: '300px' }}
                       id="login"
                       type="text"
                       placeholder="Логін"
                       value={login}
                       onChange={(e) => setLogin(e.target.value)}
                />
                <label htmlFor="password" className="form-label">Пароль</label>
                <input className="form-control mb-4"
                       id="password"
                       type="password"
                       placeholder="Пароль"
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                {isRegistering ? (
                    <>
                        <label htmlFor="birthday" className="form-label mt-2">Дата народженння</label>
                        <input className="form-control mb-4 "
                               id="birthday"
                               type="date"
                               required
                               placeholder="Дата народження"
                               value={birthday}
                               onChange={(e) => setBirthday(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">Зареєструватися</button>
                    </>
                ) : (
                    <div className="button-part">
                        <button className="btn btn-primary" type="submit">Увійти</button>
                        <a href="#" onClick={() => setIsRegistering(true)}>Зареєструватися</a>
                    </div>
                )}
            </div>
        </form>
    );
};

export default LoginForm;
