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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY], // Use an environment variable for your session key
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve the static files from the React app in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
