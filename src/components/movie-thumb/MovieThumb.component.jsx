import React from 'react';
import './MovieThumb.styles.scss';
import {Link} from 'react-router-dom';
import '../movie-row/MovieRow.styles.scss';

const MovieThumb = ({image, clickable, movieId}) => (
    <div className="moviethumb card">
        {clickable ? (<Link to={`/movie/${movieId}`}><img src={image} className="clickable" alt="Movie Thumbnail"/></Link>) : <img src={image} alt="Movie Thumbnail"/>}
    </div>
);

export default MovieThumb;