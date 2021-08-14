import React from 'react';
import Styles from './Home.module.css';
import { useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {

    // const signInLinkStyle = {
    //     color: '#0077ff',
    //     fontWeight: 'bold',
    //     textDecoration: 'none',
    //     marginLeft: '10px',
    // };

    const history = useHistory();
    function startRegister() {
        history.push('/authenticate');
    }
    
    return (
        <div className={Styles.cardWrapper}>
            <Card title="Welcome to ClubhHouse" icon="logo" >
                <p className={Styles.text}>
                    We’re working hard to get Codershouse ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <Button onClick={startRegister} text="Let's Go" />
            </Card>
        </div>
    )
}

export default Home
