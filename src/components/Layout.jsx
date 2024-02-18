import React, {useState} from 'react';
import Menu from "./Menu.jsx";
import { Outlet } from "react-router-dom";
import '../index.css'
import LoginForm from "./LoginForm.jsx";
import {useSelector} from "react-redux";

const Layout = () => {

    const authorizedUser = useSelector(state => state.authorizedUserReducer)

    return (
        <div>
            {authorizedUser === null &&
                <LoginForm/>
            }
            <Menu/>
            <Outlet/>
        </div>
    );
};

export default Layout;