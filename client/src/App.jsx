<<<<<<< HEAD
import "./App.css";
=======
import './App.css';
// import { useEffect, useState } from "react";
>>>>>>> edd91c7c260ce2eea582956ea2f097aaa1d986ba
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
<<<<<<< HEAD
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route } from "react-router-dom";
import SpotifyAuthHandler from './components/SpotifyAuthHandler'; // Import the SpotifyAuthHandler component
=======
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SpotifyPlayer from "./components/SpotifyPlayer/SpotifyPlayer"; // Import your SpotifyPlayer component
// import HomePage from "./pages/Home"; // Import your HomePage component
// import OtherPage from "./pages/Login/Login";
import { Outlet } from 'react-router-dom';
>>>>>>> edd91c7c260ce2eea582956ea2f097aaa1d986ba
// ... import other components and pages ...
import React, { useState, useEffect } from 'react';
import authService from './utils/auth.js';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
<<<<<<< HEAD
  // ... (other states and effects if needed)
=======
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.loggedIn();
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // const [user, setUser] = useState(null);
  // const [accessToken, setAccessToken] = useState(null); // State to store the Spotify access token
>>>>>>> edd91c7c260ce2eea582956ea2f097aaa1d986ba

  return (
    <ApolloProvider client={client}>
      {/* No Router here, just Routes and Route */}
      <Routes>
        {/* Define other routes for your application */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/other" element={<OtherPage />} /> */}
        {/* ... other routes ... */}

        {/* Add the SpotifyAuthHandler route */}
        <Route path="/spotify-auth-success" element={<SpotifyAuthHandler />} />
      </Routes>
      {/* The SpotifyPlayer component that might be shown conditionally */}
      {/* {accessToken && <SpotifyPlayer accessToken={accessToken} />} */}
    </ApolloProvider>
  );
}

export default App;
