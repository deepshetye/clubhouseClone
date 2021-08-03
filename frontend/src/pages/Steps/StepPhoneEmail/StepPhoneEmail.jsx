import React, { useState } from 'react';

const phoneEmailMap = {
    phone: Phone,
    email: Email
}

const StepPhoneEmail = ({ onClick }) => {

    const [ type, setType ] = useState('phone');
    const Type = phoneEmailMap[type]

    const stepHandler = () => {

    }

    return (
        <div>
            <Type onClick={stepHandler}/>
        </div>
    )
}

export default StepPhoneEmail
