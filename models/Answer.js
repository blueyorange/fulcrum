import { Schema, model } from "mongoose";

const AnswerSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  student: { type: Schema.Types.ObjectId, ref: "User" },
  answer: { type: String },
  isCorrect: { type: Boolean },
  confidence: { type: Number },
});

export default model("Answer", AnswerSchema);
