import "./App.css";
import { useEffect, useState } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
    //   fetch("http://localhost:3000/auth/login/success", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Credentials": true,
    //     },
    //   })
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
    // };
    getUser();
  }, []);

  console.log(user);

  return (
    <>
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
