import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import Styles from '../StepPhoneEmail.module.css';
import TextInput from '../../../../components/shared/TextInput/TextInput';

const Email = ({onNext}) => {
    const [email, setEmail] = useState('');
    return (
        <Card title="Enter your email id" icon="email-emoji">
            <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <div className={Styles.actionButtonWrap}>
                    <Button text="Next" onClick={onNext} />
                </div>
                <p className={Styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    );
}

export default Email
