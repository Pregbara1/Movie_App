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


