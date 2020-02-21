import React from 'react'
import './Home.styles.scss';

import {
    IMAGE_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE,
    SEARCH_BASE_URL,
    POPULAR_BASE_URL
} from '../../assets/config';

import HeroImage from '../../components/hero-image/HeroImage.component';
import Grid from '../../components/grid/Grid.component';
import MovieThumb from '../../components/movie-thumb/MovieThumb.component';
import NoImage from '../../assets/no_image.jpg';
import Spinner from '../../components/spinner/Spinner.component';
import LoadMoreBtn from '../../components/load-more-btn/LoadMoreBtn.component';
import SearchBar from '../../components/search-bar/SearchBar.component';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            searchTerm: '',
            data: {movies: []},
            error: false,
            loading: false
        };
    }

    fetchMovies = async endpoint => {

        const isLoadMore = endpoint.search('page');
        try{
            const result = await (await fetch(endpoint)).json();
            this.setState( prev => ({
                ...prev,
                data: {
                    movies: isLoadMore !== -1 ? [...prev.data.movies, ...result.results] : [...result.results],
                    heroImage: prev.data.heroImage || result.results[0],
                    currentPage: result.page,
                    totalPages: result.total_pages
            }}));
        } catch(error){
            alert(error);
        }
    }

    componentDidMount(){
        // console.log('...fetching');
        // this.fetchMovies(POPULAR_BASE_URL);
        // console.log('done fetching...');
        if(sessionStorage.homeState){
            console.log("Getting from session storage");
            this.setState({
                data: JSON.parse(sessionStorage.homeState),
                loading: false
            });
        }else{
            console.log("Getting from API");
            this.fetchMovies(POPULAR_BASE_URL);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if((this.state.searchTerm !== prevState.searchTerm) || (this.state.data.movies !== prevState.data.movies)){
            if(!this.state.searchTerm){
                console.log("Writing to session storage, search is clear");
                sessionStorage.setItem('homeState', JSON.stringify(this.state.data));
            }
        }
    }

    searchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

        this.setState({searchTerm: search});
        this.fetchMovies(endpoint);
    }

    loadMoreMovies = () => {
        const searchEndpoint = `${SEARCH_BASE_URL}${this.state.searchTerm}&page=${this.state.data.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${this.state.data.currentPage + 1}`;

        const endpoint = this.state.searchTerm ? searchEndpoint : popularEndpoint;

        this.fetchMovies(endpoint);
    }

    render(){
        const {heroImage, currentPage, totalPages, movies} = this.state.data;
        const {searchTerm, loading, error} = this.state;
        console.log(this.state);
        console.log('rendered');
        if(!movies[0]) return <Spinner/>
        return(
            <React.Fragment>
                {!searchTerm && <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />}
                <SearchBar callback={this.searchMovies}/>
                <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
                    {movies.map(movie => (
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
                    <LoadMoreBtn text="Load More" callback={this.loadMoreMovies}/>
                )}
            </React.Fragment>
        );
    }
};

export default Home;