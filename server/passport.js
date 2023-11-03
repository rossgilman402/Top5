const SpotifyStrategy = require("passport-spotify").Strategy;
const passport = require("passport");

passport.use(
  new SpotifyStrategy(
    {
      clientID: "f4f10d8cdc4c43cfb9696c430ba1cb5a",
      clientSecret: " 72ab0302629e417cb4ca0c834c4479e3",
      callbackURL: "/auth/spotify/callback",
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      //   User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
