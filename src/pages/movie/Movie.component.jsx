import React from 'react';
import {API_URL, API_KEY} from '../../assets/config';

import Navigation from '../../components/navigation/Navigation.component';
import MovieInfo from '../../components/movie-info/MovieInfo.component';

class Movie extends React.Component{
    constructor(){
        super();
        this.state={
            data: {
                directors: []
            },
            loading: true,
            error: false
        };
    }

    fetchData = async movieId => {
        this.setState({
            error: false,
            loading: true
        });

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
            alert(error);
        }
        this.setState({loading: false});
    }

    componentDidMount(){
        const {movieId} = this.props.match.params;
        
        if(localStorage.getItem(`${movieId}`)){
            console.log("grabbing from localStorage" + " " + movieId);
            this.setState({
                data: JSON.parse(localStorage.getItem(`${movieId}`))
            });
        } else {
            console.log("Grabbing from API");
            const {movieId} = this.props.match.params;
            this.setState({loading: true});
            this.fetchData(movieId);
        }
    }

    render(){
        const {data} = this.state;
        return(
            <React.Fragment>
                <Navigation movie={data.original_title} />
                <MovieInfo movie={data}/>
            </React.Fragment>
        );
    }
}

export default Movie;