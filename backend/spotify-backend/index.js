const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));


const app = express();
app.use(cors());

const PORT = 8888;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

// Login route
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email user-top-read user-read-recently-played';
  const auth_url = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI
    });
  res.redirect(auth_url);
});

// Callback route
```js
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      new URLSearchParams({
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(
            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
          ).toString('base64')
        }
      }
    );

    const { access_token, refresh_token } = response.data;

    // Redirect tokens to frontend
    res.redirect(`http://localhost:5173/callback?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error during authentication');
  }
});
```


// Fetch Top Tracks
app.get('/top-tracks', async (req, res) => {
  const access_token = req.query.access_token;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: { 'Authorization': 'Bearer ' + access_token }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching top tracks');
  }
});

// Fetch Top Artists
app.get('/top-artists', async (req, res) => {
  const access_token = req.query.access_token;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { 'Authorization': 'Bearer ' + access_token }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching top artists');
  }
});

// Fetch Recently Played Tracks
app.get('/recently-played', async (req, res) => {
  const access_token = req.query.access_token;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: { 'Authorization': 'Bearer ' + access_token }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error fetching recently played');
  }
});


const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Backend running at https://localhost:${PORT}`);
});
