const SpotifyStrategy = require("passport-spotify").Strategy;
const passport = require("passport");

passport.use(
  new SpotifyStrategy(
    {
      clientID: "0d716f477d2940b8b04257227cc33a80",
      clientSecret: "da279986469a44149eb6b529c4e939d5",
      callbackURL: "http://localhost:3000/auth/spotify/callback",
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      //   User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
