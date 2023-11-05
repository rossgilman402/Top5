import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SpotifyAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the access token from the URL
    const accessToken = new URLSearchParams(location.search).get('access_token');
    
    if (accessToken) {
      // Save the access token in local storage
      localStorage.setItem('spotifyAccessToken', accessToken);
      
      // Redirect to the home page or dashboard
      navigate('/');
    } else {
      // Handle the error, show a message, or redirect to an error page
      navigate('/error');
    }
  }, [location, navigate]);

  // Render a loading message or spinner
  return <div>Loading...</div>;
};

export default SpotifyAuthHandler;
