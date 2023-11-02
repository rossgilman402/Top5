import "./App.css";
// const Login = require('../src/pages/Login');
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import PlayList from "./components/PlayList";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Auth from "./utils/auth";
import { Outlet } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
        <PlayList />
        <h1>Welcome to Top5</h1>
        <Outlet />
        {Auth.loggedIn() && <h2>Logged In!</h2>}
      </ApolloProvider>
    </>
  );
}

export default App;
