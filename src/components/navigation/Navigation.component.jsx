import React from 'react';
import './Navigation.styles.scss';

import {Link} from 'react-router-dom';

const Navigation = ({movie}) => (
    <div className="navigation">
        <div className="navigation-content">
            <Link to="/">
                <p>Home</p>
            </Link>
            <p>|</p>
            <p>{movie}</p>
        </div>
    </div>
);

export default Navigation;