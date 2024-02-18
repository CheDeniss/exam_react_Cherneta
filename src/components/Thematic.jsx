import React, {useEffect, useState} from 'react';
import './CSSS/Thematic.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchThematics, setUserChoice} from "../actions/ActionCreater.jsx";
import {Link, useNavigate} from "react-router-dom";
import Loader from "./Loader.jsx";

const Thematic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const themes = useSelector(state => state.thematicReducer);
    const [difficult, setDifficult] = useState('easy');

    useEffect(() => {
        dispatch(fetchThematics());
        return () => {
            console.log(themes);
        };
    }, []);

    const handleThemeClick = (themeId, themeName) => {
        console.log('Link clicked')
        dispatch(setUserChoice(difficult, themeName, themeId));
        navigate('/quiz');
    }

    if (themes.error !== null) {
        return <h1>ERROR - {themes.error}</h1>;
    }

    return (
        <>
            {themes.thematic.length === 0 ? <Loader/> : (
                <div className="thematic-container">
                    <h2>На цій сторінці можна обрати складності питань та тему вікторини</h2>
                    <select value={difficult} onChange={(e) => setDifficult(e.target.value)} className="form-select w-50">
                        <option value="easy">Легкі питання</option>
                        <option value="medium">Середня складнісь</option>
                        <option value="hard">Складні питання</option>
                    </select>
                    <hr/>
                    <ul className="thematic-ul">
                        {themes.thematic.map((theme, index) => (
                            <li key={index} className="thematic-li">
                                <Link to="#" onClick={() => handleThemeClick(theme.id, theme.name)}>{theme.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
export default Thematic;
