const router = require("express").Router();
const passport = require("../config/passport-spotify-strategy");

//Auth to get access token
router.get(
  "/getAccessToken",
  passport.authenticate("spotify"),
  // { scope: ["profile"] },
  async (req, res) => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          // what will the headers be?
          // "Content-Type": "application",
          // "Authorization": ""
        },
      });
      if (response.ok) {
        const data = await response.json();
        res.json({ access_token: data.access_token });
      } else {
        res.status(500).json({ error: "Failed to get access token." });
      }
    } catch (err) {
      res.status(500).console.err(err);
    }
  }
);

// //Auth logout
// router.get("/logout", (req, res) => {
//   //Handle with passport
//   res.send("logging out");
// });

// //Auth with Spotify
// router.get(
//   "/spotify",
//   passport.authenticate("spotify", {
//     scope: ["profile"],
//   })
// );

module.exports = router;
