import React from 'react';
import "./Header.styles.scss";
import RMDBLogo from '../../assets/reactMovie_logo.png';
import TMDBLogo from '../../assets/tmdb_logo.svg';
import {Link} from 'react-router-dom';

const Header = () => (
    <div className="header">
        <div className="header-content">
            <Link to="/">
                <img src={RMDBLogo} className="react-logo" alt="React-logo"/>
            </Link>
            <img src={TMDBLogo} className="api-logo" alt="logo"/>
        </div>
    </div>
);

export default Header;