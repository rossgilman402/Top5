import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './Login.css';
import Top5 from '../../assets/top5-logo.png';
import SpotifyLogo from '../../assets/spotify-logo.png';
import SoundCloudLogo from '../../assets/soundcloud.png';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({ email: '', password: '' });
  };

  const spotifyClick = () => {
    const client_id = '0d716f477d2940b8b04257227cc33a80'; // Your Spotify Client ID
    const response_type = 'code';
    const redirect_uri = encodeURIComponent('http://localhost:3000/callback'); // Your registered redirect URI
    const scope = encodeURIComponent('playlist-read-private user-read-email');
    const state = 'OPTIONAL_STATE'; // Replace with your state value or a method to generate it

    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;

    window.open(spotifyAuthUrl, '_self');
  };

  return (
    <div className="main-container">
      {data ? (
        <Link to="/"></Link>
      ) : (
        <div className="login-container">
          <h1>Login or Create Account</h1>
          <img src={Top5} alt="Top5 Logo" />
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-input"
              placeholder="Password"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
          {error && <div className="error-message">{error.message}</div>}
          <p>Don't have an account? <Link to="/Signup">Sign up for Top5</Link></p>
          <p>Or sign in with:</p>
          <div className="extra-signup">
            <button onClick={spotifyClick}>
              <img src={SpotifyLogo} alt="Spotify Logo" />
            </button>
            <button>
              <img src={SoundCloudLogo} alt="Sound Cloud Logo" />
            </button>
          </div>
          <Link className="goback" to="/">Go Back</Link>
        </div>
      )}
    </div>
  );
};

export default Login;
