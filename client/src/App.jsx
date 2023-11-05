import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route } from "react-router-dom";
import SpotifyAuthHandler from './components/SpotifyAuthHandler'; // Import the SpotifyAuthHandler component
// ... import other components and pages ...

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
  // ... (other states and effects if needed)

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
