import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const Header = React.memo(({
    user
}) => {
    return <>
        <div id="header">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/movies">Movies</NavLink></li>
                <li><NavLink to="/timings">Slots</NavLink></li>
                <li><NavLink to="/purchase">purchase</NavLink></li>
            </ul>
        </div>
    </>;
});

Header.propTypes = {
    user: PropTypes.object
}

export default Header;