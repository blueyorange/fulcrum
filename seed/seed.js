import fs from "fs";
import mongoose from "mongoose";
import "../config.js";
import Question from "../models/Question.js";

async function run() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let rawdata = fs.readFileSync("./seed/data/questions.json");
  let questions = JSON.parse(rawdata);
  console.log(`Inserting ${questions.length} questions into db...`);
  await Question.insertMany(questions);
  console.log("Finished.");
}

run();
