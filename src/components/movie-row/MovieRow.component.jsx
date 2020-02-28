import React from 'react';
import './MovieRow.styles.scss';
import MovieThumb from '../../components/movie-thumb/MovieThumb.component';
import NoImage from '../../assets/no_image.jpg';
import RightArrow from '../arrows/RightArrow.component';
import LeftArrow from '../arrows/LeftArrow.component';


import {
    IMAGE_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE,
    SEARCH_BASE_URL,
    POPULAR_BASE_URL
} from '../../assets/config';

class MovieRow extends React.Component{
    constructor(){
        super();
        this.state={
            index: 0
        }
    }

    goToPrevSlide = () => {
        if(this.state.index === 0){
            return this.setState({index: 12});
        }
        this.setState({index: this.state.index - 1});
    }

    goToNextSlide = () => {
        if(this.state.index === 12){
            return this.setState({index: 0});
        }

        this.setState({index: this.state.index + 1});
    }

    render(){
        const hr={
            border: "0",
            height: "2px",
            backgroundImage: "radial-gradient(circle, rgba(210, 208, 208, 0.190914) 0%, rgba(210, 208, 208, 0) 90%)",
        }
        return(
            <div className="movierow">
                <h1>{this.props.header}</h1>
                <div className="movierow-content" style={{
                    transform: `translateX(-${this.state.index * 5}%)`
                }}>
                    {this.props.movies.map(movie => (
                        <MovieThumb
                        key={movie.id}
                        clickable
                        image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                        movieId={movie.id}
                        movieName={movie.original_title}
                        />
                    ))}
                </div>
                <LeftArrow className="backarrow arrow" goToPrevSlide={this.goToPrevSlide}/>
                <RightArrow className="nextarrow arrow" goToNextSlide={this.goToNextSlide}/>
                <hr style={hr}></hr>>
            </div>
        );
    }
};

export default MovieRow;