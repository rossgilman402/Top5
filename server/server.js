require('dotenv').config(); // Ensure this is at the top

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
//require("./passport")(passport);
const authRoutes = require("./routes/auth-routes");
const spotifyAuthRoutes = require("./routes/spotify.auth"); // Make sure this is the correct path
const cors = require("cors");
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth-routes');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

//Create our server
const socketServer = createServer(app);
const io = new Server(socketServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY], // Use an environment variable for your session key
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
    name: 'session',
    keys: ['passsord'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoute);

// socketServer.listen(5000, () => {
//   console.log(`Socket Server running at http://localhost:${5000}`);
// });

// If you need CORS, you can uncomment and configure it
// app.use(cors({
//   origin: "http://localhost:3000", // Your client's URL
//   methods: "GET, POST, PUT, DELETE",
//   credentials: true,
// }));

app.use("/auth", authRoutes);
app.use("/spotify", spotifyAuthRoutes); // Adding the Spotify auth route

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve the static files from the React app in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const { expressMiddleware } = require("@apollo/server/express4");
// const { typeDefs, resolvers } = require("./schemas");
// const db = require("./config/connection");
// const path = require("path");
// const cookieSession = require("cookie-session");
// const passport = require("passport");
// const authRoute = require("./routes/auth-routes");
// // const { Server } = require("socket.io");
// const { authMiddleware } = require("./utils/auth");

// const PORT = process.env.PORT || 3001;
// const app = express();

// const http = require("http").Server(app);
// const cors = require("cors");

// const io = require("socket.io")(http, {
//   cors: {
//     origin: `http://localhost:${PORT}`,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// io.attach(http); // Attach the WebSocket server to the HTTP server

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["passsord"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// const startServers = async () => {
//   await server.start();
//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());
//   app.use(
//     "/graphql",
//     expressMiddleware(server, {
//       context: authMiddleware,
//     })
//   );

//   app.use("/auth", authRoute);

//   server.applyMiddleware({ app });

//   if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/dist")));

//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "../client/dist/index.html"));
//     });
//   }

//   db.once("open", () => {
//     http.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//       console.log(`Socket Server running at http://localhost:${PORT}`);
//     });
//   });
// };

// startServers();
