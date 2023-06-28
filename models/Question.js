import { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  image: { type: String },
  correct: { type: String },
  text: { type: String },
  category: { type: String },
});

export default model("Question", QuestionSchema);
