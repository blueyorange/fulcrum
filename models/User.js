import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id: { type: String, default: null, unique: true },
  name: { type: String, required: true },
  givenName: { type: String, required: true },
  surname: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "teacher", "student"],
  },
  credentials: {
    access_token: { type: String },
    refresh_token: { type: String },
  },
});

export default model("User", UserSchema);
