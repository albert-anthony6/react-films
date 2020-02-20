import React from 'react';
import './MovieThumb.styles.scss';
import {Link} from 'react-router-dom';

const MovieThumb = ({image, clickable, movieId}) => (
    <div className="moviethumb">
        {clickable ? (<Link to={`/${movieId}`}><img src={image} className="clickable" alt="Movie Thumbnail"/></Link>) : <img src={image} alt="Movie Thumbnail"/>}
    </div>
);

export default MovieThumb;