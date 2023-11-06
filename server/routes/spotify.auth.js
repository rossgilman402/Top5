const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const router = express.Router();

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    if (response.data.access_token) {
      // Handle the access token (e.g., create a session, store in the database, etc.)
      res.redirect('/your-frontend-success-page');
    }
  } catch (error) {
    console.error('Error during Spotify OAuth callback:', error);
    res.status(500).send('Authentication error');
  }
});

module.exports = router;
