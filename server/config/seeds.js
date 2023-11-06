const db = require("./connection");
const { User, Playlist } = require("../models");
const cleanDB = require("./cleanDB");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  await cleanDB("User", "users");

  const userArray = [
    { email: "rossGilman@gmail.com", password: "password" },
    { email: "michaelHorton@gmail.com", password: "password" },
    { email: "clarissaFuller@gmail.com", password: "password" },
    { email: "stevenFrancuis@gmail.com", password: "password" },
  ];

  try {
    for (const user of userArray) {
      await User.create(user);
    }
  } catch (err) {
    console.log(err);
  }

  await cleanDB("Playlist", "playlists");

  // await Playlist.create(userSeeds);

  console.log("all done!");
  process.exit(0);

  console.log("Users seeded");

  process.exit();
});
