<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpotifyAuthHandler from './components/SpotifyAuthHandler'; // Import the SpotifyAuthHandler component
=======
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
>>>>>>> edd91c7c260ce2eea582956ea2f097aaa1d986ba

import Home from './pages/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/Chat.jsx';
import MakePlaylist from './pages/MakePlaylist/MakePlaylist';
import SinglePlaylist from './pages/SinglePlaylist';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/makeplaylist',
        element: <ProtectedRoute element={<MakePlaylist />} />,
      },
      {
        path: '/playlist',
        element: <ProtectedRoute element={<SinglePlaylist />} />,
      },
      {
        path: '/chat',
        element: <ProtectedRoute element={<Chat />} />,
      },
      // Add the SpotifyAuthHandler route
      {
        path: "/spotify-auth-success",
        element: <SpotifyAuthHandler />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
