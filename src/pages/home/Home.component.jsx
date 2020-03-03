import React from 'react'
import './Home.styles.scss';

import {
    IMAGE_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE,
    POPULAR_BASE_URL,
    NOW_PLAYING_BASE_URL,
    UPCOMING_BASE_URL
} from '../../assets/config';

import {connect} from 'react-redux';
import {fetchMoviesStartAsync, loadMoreMovies, resetMovies} from '../../redux/redux-home/home.actions';

import HeroImage from '../../components/hero-image/HeroImage.component';
import Grid from '../../components/grid/Grid.component';
import MovieThumb from '../../components/movie-thumb/MovieThumb.component';
import NoImage from '../../assets/no_image.jpg';
import Spinner from '../../components/spinner/Spinner.component';
import LoadMoreBtn from '../../components/load-more-btn/LoadMoreBtn.component';
import SearchBar from '../../components/search-bar/SearchBar.component';
import MovieRow from '../../components/movie-row/MovieRow.component';
import Categories from '../../components/categories/Categories.component';

class Home extends React.Component{

    componentDidMount(){
        if(sessionStorage.homeState){
            console.log("Getting from session storage");
            this.props.resetMovies(JSON.parse(sessionStorage.homeState));
        }else{
            console.log("Getting from API");
            this.props.fetchMoviesStartAsync(POPULAR_BASE_URL, 'popular');
            this.props.fetchMoviesStartAsync(NOW_PLAYING_BASE_URL, 'now_playing');
            this.props.fetchMoviesStartAsync(UPCOMING_BASE_URL, 'upcoming');
        }
    }

    componentDidUpdate(prevProps, prevState){
        if((this.props.searchTerm !== prevProps.searchTerm) || (this.props.data.movies !== prevProps.data.movies)){
            if(!this.props.searchTerm){
                console.log("Writing to session storage, search is clear");
                sessionStorage.setItem('homeState', JSON.stringify(this.props.data));
            }
        }
    }

    render(){
        const {heroImage, currentPage, totalPages, movies} = this.props.data;
        const {searchTerm, loading, error} = this.props;
        console.log('rendered');
        if(error) return <div>Whoops..Something went wrong</div>
        if(!movies.popular[0]) return <Spinner/>
        return(
            <React.Fragment>
                {!searchTerm && <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />}
                <SearchBar/>
                {!searchTerm && <Categories/>}
                {!searchTerm && <MovieRow header='Now Playing' movies={movies.now_playing}/>}
                {!searchTerm && <MovieRow header="Upcoming" movies={movies.upcoming}/>}
                {!searchTerm && <MovieRow header='Popular' movies={movies.popular}/>}
                {searchTerm && <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                    {movies.search.map(movie => (
                        <MovieThumb
                            key={movie.id}
                            image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                            movieName={movie.original_title}
                            clickable
                            movieId={movie.id}
                        />
                    ))}
                </Grid>}
                {loading && <Spinner/>}
                {currentPage < totalPages && !loading && searchTerm && (
                    <LoadMoreBtn text="Load More" callback={this.props.loadMoreMovies}/>
                )}
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => ({
    searchTerm: state.home.searchTerm,
    data: state.home.data,
    loading: state.home.loading,
    error: state.home.error
});

const mapDispatchToProps = dispatch => ({
    fetchMoviesStartAsync: (endpoint, category) => dispatch(fetchMoviesStartAsync(endpoint, category)),
    loadMoreMovies: () => dispatch(loadMoreMovies()),
    resetMovies: (sessionData) => dispatch(resetMovies(sessionData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);