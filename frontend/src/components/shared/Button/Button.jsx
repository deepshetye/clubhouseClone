import React from 'react';
import Styles from './Button.module.css';

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className={Styles.button} >
            <span>{text}</span>
            <img className={Styles.arrow} alt="forward arrow" src="/images/arrow-forward.png  " />
        </button>
    )
}

export default Button
