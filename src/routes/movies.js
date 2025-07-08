// routes/movies.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Example route
router.get('/', async (req, res) => {
  try {
	// Example: fetch movies from an API
	const response = await axios.get('https://api.example.com/movies');
	res.json(response.data);
  } catch (error) {
	res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

module.exports = router;


// Helper to fetch genre list (can be cached in memory or DB)
let tmdbGenres = null;
async function fetchTmdbGenres() {
    if (tmdbGenres) return tmdbGenres;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
            params: { api_key: process.env.TMD_API_KEY }
        });
        tmdbGenres = response.data.genres; // e.g., [{id: 28, name: "Action"}, ...]
        return tmdbGenres;
    } catch (err) {
        console.error("Error fetching TMDb genres:", err.message);
        return [];
    }
}

// @route   GET /api/movies/discover
// @desc    Discover movies with filtering by genre, year, sort_by etc.
// @access  Public
router.get('/discover', async (req, res) => {
    const { genre_ids, year, sort_by, page = 1, vote_average_gte } = req.query; // Example filters

    const params = {
        api_key: process.env.TMD_API_KEY,
        page: page
    };

    if (genre_ids) {
        // genre_ids should be comma-separated TMDb IDs (e.g., "28,12")
        params.with_genres = genre_ids;
    }
    if (year) {
        params.primary_release_year = year; // Or release_date.gte/lte
    }
    if (sort_by) {
        // e.g., popularity.desc, vote_average.desc
        params.sort_by = sort_by;
    }
    if (vote_average_gte) {
        params['vote_average.gte'] = parseFloat(vote_average_gte); // Min average rating
    }

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, { params });
        res.json(response.data);
    } catch (err) {
        console.error('Error fetching discovered movies:', err.message);
        res.status(500).send('Server error fetching movies with filters');
    }
});

// Optional: Endpoint to get genres for frontend dropdowns
// @route   GET /api/movies/genres
// @desc    Get TMDb movie genre list
// @access  Public
router.get('/genres', async (req, res) => {
    try {
        const genres = await fetchTmdbGenres();
        res.json(genres);
    } catch (err) {
        res.status(500).send('Server error fetching genres');
    }
});


