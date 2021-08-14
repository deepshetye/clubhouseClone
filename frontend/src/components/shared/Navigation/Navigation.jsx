import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Navigation = () => {
    const logoStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'
    }

    const logoText = {
        marginLeft: '10px',
    }

    const dispatch = useDispatch();

    const { isAuth } = useSelector((state) => state.auth)

    async function logoutUser() {
        try {
            const { data } = await logout();
            dispatch(setAuth(data));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className={`${Styles.navbar} container`} >
            <Link style={logoStyle} to="/" >
                <img src="/images/logo.png" alt="Logo" />
                <span style={logoText} >ClubHouse</span>
            </Link>
            { isAuth && <button onClick={logoutUser}>Logout</button> }
        </nav>
    )
}

export default Navigation
