import React from 'react';
import './MovieThumb.styles.scss';
import {Link} from 'react-router-dom';
import '../movie-row/MovieRow.styles.scss';

const MovieThumb = ({image, clickable, movieId, movieName}) => (
    <div className="moviethumb cards">
        {clickable ? (<Link to={`/movie/${movieId}`}><img src={image} className="clickable card" alt="Movie Thumbnail"/></Link>) : <img src={image} className="card" alt="Movie Thumbnail"/>}
        <h4 className="card">{movieName}</h4>
    </div>
);

export default MovieThumb;