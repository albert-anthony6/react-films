import {HomeActionTypes} from './home.types';

const INITIAL_STATE = {
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

const homeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case HomeActionTypes.FETCH_MOVIES:
            return{
                ...state,
                data: {
                    movies: action.payload.isLoadMore !== -1 ? {...state.data.movies, [action.payload.category]: [...state.data.movies[action.payload.category], ...action.payload.result.results]} : { ...state.data.movies, [action.payload.category]: [...action.payload.result.results]},
                    heroImage: state.data.heroImage || action.payload.result.results[0],
                    currentPage: action.payload.result.page,
                    totalPages: action.payload.result.total_pages
                }
            }
        case HomeActionTypes.SEARCH_MOVIES:
            return{
                ...state,
                searchTerm: action.payload
            }
        case HomeActionTypes.RESET_MOVIES:
            return{
                ...state,
                data: action.payload,
                loading: false,
                searchTerm: ""
            }
        default:
            return state;
    }
}

export default homeReducer;