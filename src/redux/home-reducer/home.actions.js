import {HomeActionTypes} from './home.types';
import {
    SEARCH_BASE_URL,
    POPULAR_BASE_URL
} from '../../assets/config';

export const fetchMovies = async (endpoint, category) => {
    const isLoadMore = endpoint.search('page');
    let result;
    try{
        result = await (await fetch(endpoint)).json();
        console.log(category + " " + " 5555");
    } catch(error){
        // this.setState({error: true});
        alert(error);
    }
    console.log(category + " " + " 5555");

    return{
        type: HomeActionTypes.FETCH_MOVIES,
        payload: {result, category, isLoadMore}
    }
}

export const searchMovies = (search) => {
    return dispatch => {
        if(!search){
            dispatch({
                type: HomeActionTypes.SEARCH_MOVIES,
                payload: search
            });
            return;
        }
        dispatch({
            type: HomeActionTypes.SEARCH_MOVIES,
            payload: search
        });
        dispatch(fetchMovies(SEARCH_BASE_URL + search, 'search'));
    }
}

export const loadMoreMovies = () => {
    return (dispatch, getState) => {
        const state = getState();
        const searchEndpoint = `${SEARCH_BASE_URL}${state.home.searchTerm}&page=${state.home.data.currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${state.home.data.currentPage + 1}`;
    
        const endpoint = state.home.searchTerm ? searchEndpoint : popularEndpoint;
    
        dispatch(fetchMovies(endpoint, 'search'));
    }
}

export const resetMovies = sessionData => {
    return{
        type: HomeActionTypes.RESET_MOVIES,
        payload: sessionData
    }
}