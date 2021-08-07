import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const Timing = React.memo(({
    user
}) => {
    const emailEntry = useRef();
    const passEntry = useRef();
    const nameEntry = useRef();
    const durationEntry = useRef();

    const [existing, setExisting] = useState([]);

    const TimingRequest = async (e) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}slots/create`,
        {
            method: "post",
            headers: new Headers({
                'Content-Type' : "application/json",
                'Accept' : "application/json"
            }),
            body: JSON.stringify({
                starttime: emailEntry.current.value,
                price: passEntry.current.value,
                movieId: nameEntry.current.value,
                totaltickets: durationEntry.current.value
            })
        });

        const resp = await res.json();
        if (resp.status)
        window.location.reload();
    }

    useEffect(async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}slots/`);

        const resp = await res.json();
        setExisting(resp.result);
    }, [user]);

    const buyTicket = (id) => {
        return async () => {
            await fetch(`${process.env.REACT_APP_API_URL}slots/buy`,
            {
                method: "post",
                headers: new Headers({
                    'Content-Type' : "application/json",
                    'Accept' : "application/json"
                }),
                body: JSON.stringify({
                    id: id
                })
            });

            window.location.reload();
        }
    }

    return <>
        <div className="content">
            <div>
                <h1>Insert Timing</h1>
                <input placeholder="Start Time" name="email" id="email" type="text" ref={emailEntry}/>
                <input placeholder="Price" name="password" id="password" type="text" ref={passEntry}/>
                <input placeholder="Movie ID" name="name" id="name" type="text" ref={nameEntry}/>
                <input placeholder="totaltickets" name="name" id="name" type="text" ref={durationEntry}/>
                <button onClick={TimingRequest}>Submit</button>
            </div>
        </div>
        <div>
            <h2>Existing Timings({existing.length})</h2>
            {
                existing && existing.length && existing.map( e => {
                    return <>
                        <div>
                            <p>ID: {e._id}</p>
                            <h4>{e.movie.title}</h4>
                            <h5>{e.movie.director}</h5>
                            <h5>{e.movie.duration} minutes</h5>
                            <span>Price: {e.price}</span><br></br>
                            <span>Left: {e.tickets.left}</span><br></br>
                            <span>Start time: {e.starttime}</span>
                            <button onClick={buyTicket(e._id)}>Buy</button>
                        </div>
                    </>
                } )
            }
        </div>
    </>;
});

Timing.propTypes = {
    user: PropTypes.object
}

export default Timing;