import React from 'react'
import './Home.styles.scss';

import {
    IMAGE_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE,
    SEARCH_BASE_URL,
    POPULAR_BASE_URL,
    NOW_PLAYING_BASE_URL,
    UPCOMING_BASE_URL
} from '../../assets/config';

import HeroImage from '../../components/hero-image/HeroImage.component';
import Grid from '../../components/grid/Grid.component';
import MovieThumb from '../../components/movie-thumb/MovieThumb.component';
import NoImage from '../../assets/no_image.jpg';
import Spinner from '../../components/spinner/Spinner.component';
import LoadMoreBtn from '../../components/load-more-btn/LoadMoreBtn.component';
import SearchBar from '../../components/search-bar/SearchBar.component';
import MovieRow from '../../components/movie-row/MovieRow.component';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            searchTerm: '',
            data: {movies: {
                'popular': [],
                'now_playing': [],
                'upcoming': [],
                'search': []
            }},
            error: false,
            loading: false
        };
    }

    fetchMovies = async (endpoint, category) => {
        this.setState({
            error: false,
            loading: true
        });

        const isLoadMore = endpoint.search('page');
        try{
            const result = await (await fetch(endpoint)).json();
            console.log(category + " " + " 5555");
            this.setState( prev => ({
                ...prev,
                data: {
                    // movies: isLoadMore !== -1 ? [...prev.data.movies, ...result.results] : [...result.results],
                    movies: isLoadMore !== -1 ? {...prev.data.movies, [category]: [...prev.data.movies[category], ...result.results]} : { ...prev.data.movies, [category]: [...result.results]},
                    heroImage: prev.data.heroImage || result.results[0],
                    currentPage: result.page,
                    totalPages: result.total_pages
            }}));
        } catch(error){
            this.setState({error: true});
            console.log(error);
        }
        this.setState({loading: false});
        console.log(category + " " + " 5555");
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
            this.fetchMovies(POPULAR_BASE_URL, 'popular');
            this.fetchMovies(NOW_PLAYING_BASE_URL, 'now_playing');
            this.fetchMovies(UPCOMING_BASE_URL, 'upcoming');
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
        if(!search){
            this.setState({searchTerm: search});
            return;
        };

        this.setState({searchTerm: search});
        this.fetchMovies(SEARCH_BASE_URL + search, 'search');
    }

    loadMoreMovies = () => {
        const searchEndpoint = `${SEARCH_BASE_URL}${this.state.searchTerm}&page=${this.state.data.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${this.state.data.currentPage + 1}`;

        const endpoint = this.state.searchTerm ? searchEndpoint : popularEndpoint;

        this.fetchMovies(endpoint, 'search');
    }

    render(){
        const {heroImage, currentPage, totalPages, movies} = this.state.data;
        const {searchTerm, loading, error} = this.state;
        console.log(this.state);
        console.log('rendered');
        if(error) return <div>Whoops..Something went wrong</div>
        // if(!movies[0]) return <Spinner/>
        if(!movies.popular[0]) return <Spinner/>
        return(
            <React.Fragment>
                {!searchTerm && <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />}
                <SearchBar callback={this.searchMovies}/>
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
                    <LoadMoreBtn text="Load More" callback={this.loadMoreMovies}/>
                )}
            </React.Fragment>
        );
    }
};

export default Home;