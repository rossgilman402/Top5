const router = require("express").Router();
const passport = require("passport");

router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, message: "failure" });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ success: true, message: "Successful", user: req.user });
  }
});

router.post(
  "/spotify",
  passport.authenticate("spotify", { scope: ["profile"] })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
