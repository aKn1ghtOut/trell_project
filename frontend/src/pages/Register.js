import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const Register = React.memo(({
    user
}) => {
    const emailEntry = useRef();
    const passEntry = useRef();
    const nameEntry = useRef();

    const RegisterRequest = async (e) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}auth/Register`,
        {
            method: "post",
            headers: new Headers({
                'Content-Type' : "application/json",
                'Accept' : "application/json"
            }),
            body: JSON.stringify({
                email: emailEntry.current.value,
                password: passEntry.current.value,
                name: nameEntry.current.value
            })
        });

        const resp = await res.json();
        if (resp.status)
        window.location.reload()
    }
    return <>
        <div className="content">
            <div>
                <input placeholder="Email Address" name="email" id="email" type="text" ref={emailEntry}/>
                <input placeholder="Password" name="password" id="password" type="password" ref={passEntry}/>
                <input placeholder="Name" name="name" id="name" type="text" ref={nameEntry}/>
                <button onClick={RegisterRequest}>Submit</button>
            </div>
        </div>
    </>;
});

Register.propTypes = {
    user: PropTypes.object
}

export default Register;