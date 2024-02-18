import React, {useEffect} from 'react';
import './CSSS/ProgressLine.css';

const ProgressLine = ({index, OnSetScore}) => {
    const indexArray = [5,10,20,50,100,200,400,800,1500,3000,5000,10000];

    useEffect(() => {
        OnSetScore(indexArray[index]);
        console.log('ProgressLine -> ', indexArray[index]);
        return () => {
        };
    }, [index]);


    return (
        <div >
            <ul className='progress-container'>
                {indexArray.map((item, i) => {
                    return (
                        <li key={i} >
                            <div className={`progress-element ${i === index ? 'selected' : ''}`}><b>{indexArray[i]}</b></div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProgressLine;
