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
  let questions = JSON.parse(rawdata).questions.map((question) => {
    return { image: question.images[0], correct: question.correct[0] };
  });
  await Question.insertMany(questions).then((res) => console.log(res));
  console.log("Finished.");
}

run();
