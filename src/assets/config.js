// Configuration for TMDB
// To see the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f
// Read more about the API here: https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'hidden';

const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;
const NOW_PLAYING_BASE_URL = `${API_URL}movie/now_playing?api_key=${API_KEY}`;
const UPCOMING_BASE_URL = `${API_URL}movie/upcoming?api_key=${API_KEY}`;
const TOP_RATED_BASE_URL = `${API_URL}movie/top_rated?api_key=${API_KEY}`;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export { SEARCH_BASE_URL, POPULAR_BASE_URL, API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, NOW_PLAYING_BASE_URL, UPCOMING_BASE_URL, TOP_RATED_BASE_URL };
