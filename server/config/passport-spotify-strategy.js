const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const crypto = require("crypto");
const User = require("../models/User");
require('dotenv').config();

const env = require('./path_to_your_env_file'); // Import your environment variables

passport.use(
    new SpotifyStrategy(
        {
            clientID: env.spotify_client_id,
            clientSecret: env.spotify_client_secret,
            callbackURL: env.spotify_callback_url,
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, expires_in, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    return done(null, user);
                }

                user = await User.create({
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex"),
                    // Add other user fields as necessary
                });

                return done(null, user);
            } catch (error) {
                console.error(error);
                // Handle the error appropriately
                return done(error);
            }
        }
    )
);

module.exports = passport;
