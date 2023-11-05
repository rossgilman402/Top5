import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpotifyAuthHandler from './components/SpotifyAuthHandler'; // Import the SpotifyAuthHandler component

import Home from "./pages/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import MakePlaylist from "./pages/MakePlaylist/MakePlaylist";
import SinglePlaylist from "./pages/SinglePlaylist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/makeplaylist",
        element: <MakePlaylist />,
      },
      {
        path: "/playlist",
        element: <SinglePlaylist />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      // Add the SpotifyAuthHandler route
      {
        path: "/spotify-auth-success",
        element: <SpotifyAuthHandler />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
