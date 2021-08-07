import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const Movie = React.memo(({
    user
}) => {
    const emailEntry = useRef();
    const passEntry = useRef();
    const nameEntry = useRef();
    const durationEntry = useRef();

    const [existing, setExisting] = useState([]);

    const MovieRequest = async (e) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}movies/create`,
        {
            method: "post",
            headers: new Headers({
                'Content-Type' : "application/json",
                'Accept' : "application/json"
            }),
            body: JSON.stringify({
                title: emailEntry.current.value,
                description: passEntry.current.value,
                director: nameEntry.current.value,
                duration: durationEntry.current.value
            })
        });

        const resp = await res.json();
        if (resp.status)
        window.location.reload();
    }

    useEffect(async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}movies/`);

        const resp = await res.json();
        setExisting(resp.result);
    }, [user]);

    return <>
        <div className="content">
            <div>
                <h1>Insert Movie</h1>
                <input placeholder="Title" name="email" id="email" type="text" ref={emailEntry}/>
                <input placeholder="Description" name="password" id="password" type="text" ref={passEntry}/>
                <input placeholder="director" name="name" id="name" type="text" ref={nameEntry}/>
                <input placeholder="Duration" name="name" id="name" type="text" ref={durationEntry}/>
                <button onClick={MovieRequest}>Submit</button>
            </div>
        </div>
        <div>
            <h2>Existing Movies({existing.length})</h2>
            {
                existing && existing.length && existing.map( e => {
                    return <>
                        <div>
                            <p>ID: {e._id}</p>
                            <h4>{e.title}</h4>
                            <h5>{e.director}</h5>
                            <h5>{e.duration} minutes</h5>
                            <p>{e.description}</p>
                        </div>
                    </>
                } )
            }
        </div>
    </>;
});

Movie.propTypes = {
    user: PropTypes.object
}

export default Movie;