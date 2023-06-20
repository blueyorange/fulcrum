import { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  image: { type: String },
  correct: { type: String },
});

export default model("Question", QuestionSchema);
