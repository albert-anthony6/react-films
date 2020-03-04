import React from 'react';
import './Category.styles.scss';

import {
    IMAGE_BASE_URL,
    POSTER_SIZE
} from '../../assets/config';

import NoImage from '../../assets/no_image.jpg';

import { connect } from 'react-redux';
import { loadMoreMovies } from '../../redux/redux-home/home.actions';

import Grid from '../../components/grid/Grid.component';
import MovieThumb from '../../components/movie-thumb/MovieThumb.component';
import Spinner from '../../components/spinner/Spinner.component';
import LoadMoreBtn from '../../components/load-more-btn/LoadMoreBtn.component';

const Category = ({ match, data, loading, loadMoreMovies }) => {
    let category = match.params.categoryId;
    const { currentPage, totalPages } = data;
    return(
        <React.Fragment>
            <Grid header={`${category}`}>
                {category === 'now-playing' ? category = 'now_playing' : null, 
                category === 'top-rated' ? category = 'top_rated' : null, 
                data.movies[category].map(movie => (
                    <MovieThumb
                        key={movie.id}
                        image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                        movieName={movie.original_title}
                        clickable
                        movieId={movie.id}
                    />
                ))}
            </Grid>

            {loading && <Spinner/>}

            {currentPage < totalPages && !loading && (
                <LoadMoreBtn text="Load More" callback={loadMoreMovies}/>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    loading: state.home.loading,
    data: state.home.data
});

const mapDispatchToProps = dispatch => ({
    loadMoreMovies: () => dispatch(loadMoreMovies())
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);