const passport = require("passport");
const spotifyStrategy = require("passport-spotify").Strategy;
//const crypto = require("crypto");
const User = require("../models/User");

// const SpotifyWebAPI = require("spotify-web-api-node");
passport.use(
	new spotifyStrategy(
		{
			clientID: env.spotify_client_id,
			clientSecret: env.spotify_client_secret,
			callbackURL: env.spotify_callback_url,
			passReqToCallback: true,
		},
		async (req, accessToken, refreshToken, expires_in, profile, done) => {
			try {
				let user = await User.findOne({ email: profile.emails[0].value });

				// const playLists = await getSpotifyData(accessToken, refreshToken);
				// req.body.playlists = playLists;

				if (user) {
					return done(null, user);
				}
				user = await User.create({
					name: profile.displayName,
					email: profile.emails[0].value,
					password: crypto.randomBytes(20).toString("hex"),
					avatar: profile?.photos[0]?.value
						? profile.photos[0].value
						: "https://avatars.githubusercontent.com/u/142236345?s=400&v=4",
				});
				return done(null, user);
			} catch (error) {
				console.log(error);
				req.flash("error", "Error in finding/creating the User !!!");
				return done(error);
			}
		}
	)
);

module.exports = passport;