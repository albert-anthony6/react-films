import {HomeActionTypes} from './home.types';
import {
    SEARCH_BASE_URL
} from '../../assets/config';

export const fetchMoviesStart = () => {
    return{
        type: HomeActionTypes.FETCH_MOVIES_START
    }
}

export const fetchMoviesSuccess = (result, category, isLoadMore) => {
    return{
        type: HomeActionTypes.FETCH_MOVIES_SUCCESS,
        payload: {result, category, isLoadMore}
    }
}

export const fetchMoviesFailure = () => {
    return{
        type: HomeActionTypes.FETCH_MOVIES_FAILURE
    }
}

export const fetchMoviesStartAsync = (endpoint, category) => {
    return async (dispatch) => {
        dispatch(fetchMoviesStart());
        const isLoadMore = endpoint.search('page');
        let result;
        try{
            result = await (await fetch(endpoint)).json();
            dispatch(fetchMoviesSuccess(result, category, isLoadMore));
        } catch(error){
            dispatch(fetchMoviesFailure());
            console.log(error);
        }
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
        dispatch(fetchMoviesStartAsync(SEARCH_BASE_URL + search, 'search'));
    }
}

export const loadMoreMovies = (endpoint, category) => {
    return (dispatch) => {
        dispatch(fetchMoviesStartAsync(endpoint, category));
    }
}

export const resetMovies = sessionData => {
    return{
        type: HomeActionTypes.RESET_MOVIES,
        payload: sessionData
    }
}