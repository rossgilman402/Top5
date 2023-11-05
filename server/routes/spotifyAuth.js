const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/callback', async (req, res) => {
    const code = req.query.code;
    const clientId = process.env.SPOTIFY_CLIENT_ID; // Ensure this is set in your environment variables
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Ensure this is set in your environment variables
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // Ensure this is set in your environment variables

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', redirectUri);

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });

    const data = await response.json();

    if (data.access_token) {
        // Redirect to the client-side route with the access token in the query string
        // Replace 'http://localhost:3000' with your client-side application's base URL
        const frontendRedirectUri = `http://localhost:3000/spotify-auth-success?access_token=${data.access_token}`;
        res.redirect(frontendRedirectUri);
    } else {
        // Redirect to a client-side route that handles authentication failure
        // Replace 'http://localhost:3000' with your client-side application's base URL
        res.redirect('http://localhost:3000/spotify-auth-failure');
    }
});

module.exports = router;
