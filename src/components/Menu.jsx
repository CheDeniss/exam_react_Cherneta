import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import '../index.css';
import UserManagement from "./UserManagement.jsx";

const Menu = () => {
    const currentLocation = useLocation();

    return (
        <div className='nav-container'>
            <nav className='menu-strip'>
                <ul className="menu-ul">
                    <li><Link className={`menu-li ${currentLocation.pathname === '/quiz' ? 'selected-menu' : ''}`} to="/quiz">Вікторина</Link></li>
                    <li><Link className={`menu-li ${currentLocation.pathname === '/thematic' ? 'selected-menu' : ''}`} to="/thematic">Тематична</Link></li>
                    <li><Link className={`menu-li ${currentLocation.pathname === '/results' ? 'selected-menu' : ''}`} to="/results">Ваші результати</Link></li>
                    <li><Link className={`menu-li ${currentLocation.pathname === '/raiting' ? 'selected-menu' : ''}`} to="/raiting">Рейтинг користувачів</Link></li>
                    <li><Link className={`menu-li ${currentLocation.pathname === '/about' ? 'selected-menu' : ''}`} to="/about">Про гру</Link></li>
                </ul>
                <UserManagement />
            </nav>
        </div>
    );
};

export default Menu;
