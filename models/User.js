import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id: { type: String, default: null, unique: true },
  displayName: { type: String, required: true },
  name: { givenName: { type: String }, familyName: { type: String } },
  role: { type: String, required: true },
  credentials: {
    accessToken: { type: String },
    refreshToken: { type: String },
  },
});

export default model("User", UserSchema);
