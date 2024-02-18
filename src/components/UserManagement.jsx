import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import user_icon from "../assets/user.png";
import {clearQuizQuestions, logOut} from "../actions/ActionCreater.jsx";
import './CSSS/UserManagement.css'
import EditUserData from "./EditUserData.jsx";

const UserManagement = () => {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const dispatch = useDispatch()
    const questions = useSelector(state => state.quizQuestionsReducer); // питання
    const authUser = useSelector(state => state.authorizedUserReducer)
    const users = useSelector(state => state.registeredUsersReducer)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
                setIsSettingsOpen(false)
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(clearQuizQuestions())
    }

    const handleSettingsClick = () => {
        setIsSettingsOpen(true)
    }

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="user-menu" ref={menuRef}>
            <div className="user-icon" onClick={handleShowMenu}>
                <img className="user-icon" src={user_icon} alt="User Icon" />
            </div>
            {showMenu && (
                <div className="menu-options">
                    {authUser && (
                        <h4><b>{authUser.login}</b></h4>
                    )}
                    {questions.questions.length === 0 &&
                        <button className="btn btn-primary"  onClick={handleSettingsClick}>Налаштування</button>
                    }
                    {isSettingsOpen && <EditUserData/>}
                    <button className="btn btn-danger mt-2" onClick={handleLogout}>Вихід</button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
