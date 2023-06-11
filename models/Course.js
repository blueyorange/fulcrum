import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  id: { type: String, default: null, unique: true },
  name: { type: String },
});

export default model("Course", CourseSchema);
