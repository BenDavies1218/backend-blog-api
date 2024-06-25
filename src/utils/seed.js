const { BlogModel } = require("../models/BlogModel");
const { UserModel } = require("../models/UserModel");
const { databaseConnect, databaseClear, databaseClose } = require("./database");
const { comparePasswords, createJwt, validateJwt } = require("./authHelpers");

async function seedUsers() {
  let userData = [
    {
      username: "alex",
      password: "password",
    },
    {
      username: "pikachu",
      password: "pokemon",
    },
  ];

  let result = await UserModel.insertMany(userData);
  console.log(result);
  return result;
}

async function seedBlogPosts(usersToUse) {
  let blogData = [
    {
      title: "Super Cool Blog Post",
      content: "Pretend this is 3000 words.",
      author: usersToUse[0].id,
      headerImage: "https://placehold.co/600x400/EEE/31343C",
      tags: ["seeded", "blog", "pokemon", "cool beans"],
      categories: ["coding", "travel"],
    },
    {
      title: "Another Cool Blog Post",
      content: "Pretend this is 4000 words.",
      author: usersToUse[1].id,
      headerImage: "https://placehold.co/600x400/EEE/31343C",
      tags: ["seeded", "tada!", "pokemon", "food"],
      categories: ["photography", "life"],
    },
    {
      title: "The Third Cool Blog Post",
      content: "Pretend this is 4000 words.",
      author: usersToUse[1].id,
      headerImage: "https://placehold.co/600x400/EEE/31343C",
      tags: ["seeded", "tada!", "pokemon", "food"],
      categories: ["photography", "life"],
    },
  ];

  let thirduser = {
    username: "callum",
    password: "123456",
  };

  let callum = await UserModel.create(thirduser);

  await callum.save();

  console.log("Callum's encrypted password is: " + callum.password);
  let doesSupercoolMatch = await comparePasswords("supercool", callum.password);
  console.log("Callum's password is supercool: " + doesSupercoolMatch);

  console.log("Creating users from insertMany:");
  let result = await UserModel.insertMany(userData);
  // If we wanted pre-save on the insertMany, this is the code to do it:
  // console.log("Creating users in bulk by Promise.all over usermodel.create:");
  // let result = await Promise.all(
  //   userData.map(async (user) => {
  //     let newUser = await UserModel.create(user);
  //     return newUser;
  //   })
  // );
  return [...result, callum];
}

async function seed() {
  await databaseConnect();
  await databaseClear();

  let newUsers = await seedUsers();
  let newBlogs = await seedBlogPosts(newUsers);

  let newJwt = createJwt(newUsers[0]._id);
  console.log(newJwt);

  console.log("Seeded data!");
  await databaseClose();
}

seed();
