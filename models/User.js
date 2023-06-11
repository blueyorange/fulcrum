import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id: { type: String, default: null, unique: true },
  displayName: { type: String, required: true },
  name: { givenName: { type: String }, familyName: { type: String } },
  role: { type: String, required: true },
  credentials: {
    access_token: { type: String },
    refresh_token: { type: String },
  },
});

export default model("User", UserSchema);
