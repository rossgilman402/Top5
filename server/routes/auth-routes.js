const router = require("express").Router();
const passport = require("passport");

//Auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//Auth logout
router.get("/logout", (req, res) => {
  //Handle with passport
  res.send("logging out");
});

//Auth with yahoo
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["profile"],
  })
);

module.exports = router;
