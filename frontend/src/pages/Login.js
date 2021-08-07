import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const Login = React.memo(({
    user
}) => {
    const emailEntry = useRef();
    const passEntry = useRef();

    const loginRequest = async (e) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}auth/login`,
        {
            method: "post",
            headers: new Headers({
                'Content-Type' : "application/json",
                'Accept' : "application/json"
            }),
            body: JSON.stringify({
                email: emailEntry.current.value,
                password: passEntry.current.value
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
                <input placeholder="Password" name="password" id="password" type="text" ref={passEntry}/>
                <button onClick={loginRequest}>Submit</button>
            </div>
        </div>
    </>;
});

Login.propTypes = {
    user: PropTypes.object
}

export default Login;