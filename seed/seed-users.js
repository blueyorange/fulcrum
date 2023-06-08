import fs from "fs";
import mongoose from "mongoose";
import { config } from "dotenv";
config();
import User from "../models/User.js";

async function run() {
  console.log("Accessing db...");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.collection.drop();

  let users = JSON.parse(fs.readFileSync("./seed/data/users.json")).users;
  const result = await User.insertMany(users);
  console.log(result);
  const felix = await User.findOne({ id: "111392245021711687658" });
  const course = await Course.create({ name: "test", students: [felix._id] });
  console.log(course);
}

run();
