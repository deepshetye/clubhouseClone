import React from 'react';
import Styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={Styles.cardWrapper}>
            <div className={Styles.card} >
                <div className={Styles.headingWrapper} >
                    <img src="/images/logo.png" alt="Logo" />
                    <h1 className={Styles.heading} >Welcome to ClubhHouse</h1>
                </div>
                <p className={Styles.text}>
                    We’re working hard to get Codershouse ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <div>
                    {/* <Button onClick={startRegister} text="Let's Go" /> */}
                    <button>Let's go</button>
                </div>
                <div className={Styles.signinWrapper}>
                    <span className={Styles.hasInvite}>
                        Have an invite text?
                    </span>
                    <Link to="/login" >Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
