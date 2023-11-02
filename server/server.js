// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const path = require('path');
// const { authMiddleware } = require('./utils/auth');
// const passportLocal = require("./config/passport-local-strategy");
// const passportSpotify = require("./config/passport-spotify-strategy");
// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');
// const passport = require('passport')

// const PORT = process.env.PORT || 3001;
// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });



// const startApolloServer = async () => {
//   await server.start();

//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(passport.setAuthenticatedUser);

//   require('dotenv').config();


//   app.use(
//     '/graphql',
//     expressMiddleware(server, {
//       context: authMiddleware,
//     })
//   );

//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });
// };


// startApolloServer();


const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const passportLocal = require("./config/passport-local-strategy");
const passportSpotify = require("./config/passport-spotify-strategy");
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const passport = require('passport');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());

  // Spotify authentication route
  app.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  }));

  // Spotify callback route
  app.get('/auth/spotify/callback', 
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication
      // Redirect to the front-end or handle token
      res.redirect('/'); // Adjust as needed
    }
  );

  require('dotenv').config();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

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

// Call the async function to start the server
startApolloServer();
