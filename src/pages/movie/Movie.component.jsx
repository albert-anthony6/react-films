import React from 'react';
import {API_URL, API_KEY} from '../../assets/config';

import Navigation from '../../components/navigation/Navigation.component';
import MovieInfo from '../../components/movie-info/MovieInfo.component';
import MovieInfoBar from '../../components/movie-info-bar/MovieInfoBar.components';
import Grid from '../../components/grid/Grid.component';
import Actor from '../../components/actor/Actor.component';
import Spinner from '../../components/spinner/Spinner.component';

class Movie extends React.Component{
    constructor(){
        super();
        this.state={
            data: {
                directors: [],
                actors: []
            },
            loading: true,
            error: false
        };
    }

    fetchData = async movieId => {

        try{
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
            const result = await(await fetch(endpoint)).json();
            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            const creditsResult = await (await fetch(creditsEndpoint)).json();
            const directors = creditsResult.crew.filter(member => member.job === 'Director');
            
            this.setState({
                data: {
                    ...result,
                    actors: creditsResult.cast,
                    directors
                }
            }, () => {
                localStorage.setItem(`${movieId}`, JSON.stringify(this.state.data));
            });

        }catch(error){
            this.setState({error: true});
            console.log(error);
        }
        this.setState({loading: false});
    }

    stopLoading = () => {
        const {movieId} = this.props.match.params;
        this.setState({
            data: JSON.parse(localStorage.getItem(`${movieId}`)),
            loading: false
        });
    };

    componentDidMount(){
        const {movieId} = this.props.match.params;
        
        if(localStorage.getItem(`${movieId}`)){
            console.log("grabbing from localStorage" + " " + movieId);
            setTimeout(this.stopLoading, 100);
        } else {
            console.log("Grabbing from API");
            const {movieId} = this.props.match.params;
            this.fetchData(movieId);
        }
    }

    render(){
        const {data, loading, error} = this.state;
        if(error) return <div>Whoops..something went wrong</div>
        if(loading) return <Spinner/>
        return(
            <React.Fragment>
                <Navigation movie={data.original_title} />
                <MovieInfo movie={data}/>
                <MovieInfoBar
                    time={data.runtime}
                    budget={data.budget}
                    revenue={data.revenue}
                />
                <Grid header="Actors">
                    {data.actors.map(actor => (
                        <Actor key={actor.credit_id} actor={actor}/>
                    ))}
                </Grid>
            </React.Fragment>
        );
    }
}

export default Movie;