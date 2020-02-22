import React from 'react';
import './MovieInfo.styles.scss';

import NoImage from '../../assets/no_image.jpg';
import {IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../assets/config';
import MovieThumb from '../movie-thumb/MovieThumb.component';

const MovieInfo = ({movie}) => (
    <div className="movieinfo" style={{
        background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
        : '#000'
    }}>
        <div className="movieinfo-content">
            <div className="movieinfo-thumb">
                <MovieThumb
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                    clickable={false}
                />
            </div>
            <div className="movieinfo-text">
                <h1>{movie.title}</h1>
                <h3>PLOT</h3>
                <p>{movie.overview}</p>

                <div className="rating-director">
                    <div>
                        <h3>IMDB RATING</h3>
                        <div className="score">{movie.vote_average}</div>
                    </div>
                    <div className="director">
                        <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                        {movie.directors.map(element => (
                            <p key={element.credit_id}>{element.name}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MovieInfo;