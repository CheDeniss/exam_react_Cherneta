import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import close_icon from "../assets/close.png"
import './CSSS/EditUserData.css'
import './CSSS/LoginForm.css'
import {changeUserData, setAuth} from "../actions/ActionCreater.jsx";

const EditUserData = (index) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.registeredUsersReducer); //усі збережені користувачі
    const authUser = useSelector(state => state.authorizedUserReducer)

    const authorizedUser = users.find(user => user.id === authUser.id); //авторизований користувач));

    const [newLogin, setNewLogin] = useState('');
    const [newBirthday, setNewBirthday] = useState('');

    const [isVisible, setIsVisible] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changeUserData(authorizedUser.id, newLogin, newBirthday))
        dispatch(setAuth(authorizedUser.id, newLogin))
        setIsVisible(false);
    }

    const closeForm = () => {
        setIsVisible(false);
    }


    return (
        <>
        {isVisible && (
        <form className="logreg-container" onSubmit={handleSubmit}>
            <div className="logreg-form">
                <img className="close-icon" src={close_icon} alt="Close Icon" onClick={closeForm}/>

                <h1 >{authorizedUser.login}</h1>
                <label htmlFor="login" className="form-label">Логін</label>
                <input
                    className="form-control mb-4"
                    required
                    style={{ width: '300px' }}
                    id="login"
                    type="text"
                    placeholder="Введіть новий логін"
                    value={newLogin}
                    onChange={(e) => setNewLogin(e.target.value)}
                />
                <label htmlFor="birthday" className="form-label mt-2">Дата народженння</label>
                <input className="form-control mb-4 "
                       id="birthday"
                       type="date"
                       style={{ width: '300px' }}
                       required
                       value={newBirthday}
                       onChange={(e) => setNewBirthday(e.target.value)}
                />

                <button className="btn btn-primary" type="submit">Зберегти зміни</button>
            </div>
        </form>)}
       </>
    )
}



export default EditUserData;
