import React from 'react';
import "./Header.styles.scss";
import RMDBLogo from '../../assets/reactMovie_logo.png';
import TMDBLogo from '../../assets/tmdb_logo.svg';

const Header = () => (
    <div className="header">
        <div className="header-content">
            <img src={RMDBLogo} className="react-logo" alt="React-logo"/>
            <img src={TMDBLogo} className="api-logo" alt="logo"/>
        </div>
    </div>
);

export default Header;