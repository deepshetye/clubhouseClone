import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import Styles from '../StepPhoneEmail.module.css';

const Phone = ({onNext}) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    async function submit() {
        // const { data } = await sendOtp({ phone: phoneNumber });
        // console.log(data);
        // dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        onNext();
    }

    return (
        <Card title="Enter you phone number" icon="phone">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={Styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={Styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone
