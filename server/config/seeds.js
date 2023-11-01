const db = require("./connection");
const { User } = require("./models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("User", "Users");

  const users = await User.insertMany([
    { email: "rossGilman@gmail.com", password: "password" },
    { email: "michaelHorton@gmail.com", password: "password" },
    { email: "clarissaFuller@gmail.com", password: "password" },
    { email: "stevenFrancuis@gmail.com", password: "password" },
  ]);

  console.log("Users seeded");

  process.exit();
});
