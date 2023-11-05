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
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: '',
      password: '',
    });
  };

  const spotifyClick = () => {
    const clientId = 'f4f10d8cdc4c43cfb9696c430ba1cb5a'; // Replace with your Spotify client ID
    const redirectUri = encodeURIComponent('http://localhost:3000/callback'); // Replace with your redirect URI
    const scopes = encodeURIComponent('streaming user-read-email user-read-private');
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
    window.open(spotifyAuthUrl, "_self");
  };

  return (
    <div className="main-container">
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
            placeholder="********"
            name="password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button className="btn" type="submit">Submit</button>
        </form>
        {error && <div className="my-3 p-3 bg-danger text-white">{error.message}</div>}
        <p>Don't have an account? <Link to="/Signup">Sign up for Top5</Link></p>
        <p>Or sign in with</p>
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
    </div>
  );
};

export default Login;
