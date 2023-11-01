const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
	new LocalStrategy(
		{ usernameField: "email", passReqToCallback: true },
		async (req, email, password, done) => {
			try {
				let user = await User.findOne({ email: email });
				if (!user || user.password !== password) {
					req.flash("error", "User not Found !!!");
					return done(null, false);
				}
				return done(null, user);
			} catch (error) {
				req.flash("error", "Error in finding the User !!!");
				return done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});