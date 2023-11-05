import './App.css';
// import { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SpotifyPlayer from "./components/SpotifyPlayer/SpotifyPlayer"; // Import your SpotifyPlayer component
// import HomePage from "./pages/Home"; // Import your HomePage component
// import OtherPage from "./pages/Login/Login";
import { Outlet } from 'react-router-dom';
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

  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:3000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return response.json();
  //       }
  //       throw new Error("Authentication has failed!!");
  //     })
  //     .then((data) => {
  //       setUser(data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   };

  //   const getSpotifyAccessToken = async () => {
  //     // ... Spotify access token logic ...
  //   };

  //   getUser();
  //   getSpotifyAccessToken();
  // }, []);

  // console.log(user);

  //   return (
  //     <ApolloProvider client={client}>
  //       <Router>
  //         <div className="app-container">
  //           {/* Your site's navigation and other content here */}

  //           <Routes>
  //             <Route path="/" element={<HomePage />} />
  //             <Route path="/other" element={<OtherPage />} />
  //             {/* ... other routes ... */}
  //           </Routes>

  //           {/* The SpotifyPlayer component that might be shown conditionally */}
  //           {accessToken && <SpotifyPlayer accessToken={accessToken} />}
  //         </div>
  //       </Router>
  //     </ApolloProvider>
  //   );
  // }
  return (
    <>
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
