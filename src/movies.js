
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// ✅ Add this function back
export const fetchPopularMovies = (page = 1) => API.get(`/movies/popular?page=${page}`);
export const fetchMovieDetails = (id) => API.get(`/movies/${id}`);
export const searchMovies = (query, page = 1) => API.get(`/movies/search?query=${query}&page=${page}`);
export const fetchGenres = () => API.get('/movies/genres');

export const addFavorite = (movieId) => API.post('/user/favorites', { movieId });
export const removeFavorite = (movieId) => API.delete(`/user/favorites/${movieId}`);
