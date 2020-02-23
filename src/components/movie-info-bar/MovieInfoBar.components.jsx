import React from 'react';
import './MovieInfoBar.styles.scss';
import FontAwesome from 'react-fontawesome';
import {calcTime, convertMoney} from '../../assets/helpers';

const MovieInfoBar = ({time, budget, revenue}) => (
    <div className="movieinfobar">
        <div className="movieinfobar-content">
            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-time" name="clock-o" size="2x"/>
                <span className="movieinfobar-info">Running time: {calcTime(time)}</span>
            </div>

            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-budget" name="money" size="2x"/>
                <span className="movieinfobar-info">Budget: {convertMoney(budget)}</span>
            </div>

            <div className="movieinfobar-content-col">
                <FontAwesome className="fa-revenue" name="ticket" size="2x"/>
                <span className="movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
            </div>
        </div>
    </div>
);

export default MovieInfoBar;