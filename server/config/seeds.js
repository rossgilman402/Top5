const db = require("./connection");
const { User } = require("../models");
const cleanDB = require("./cleanDB");

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

  console.log("Users seeded");

  process.exit();
});
