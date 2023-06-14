import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  id: { type: String, default: null, unique: true },
  name: { type: String },
  teachers: [{ type: Schema.Types.ObjectId, ref: "User", role: "teacher" }],
  students: [{ type: Schema.Types.ObjectId, ref: "User", role: "student" }],
});

export default model("Course", CourseSchema);
