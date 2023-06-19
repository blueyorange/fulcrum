import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  image: { type: String },
  correct: { type: String },
});

export default model("Course", CourseSchema);
