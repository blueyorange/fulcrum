import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  source: { type: String, required: [true, "source not specified"] },
  id: { type: String, default: null, unique: true },
  displayName: { type: String, required: true },
  name: { givenName: { type: String }, familyName: { type: String } },
  role: { type: String, required: true },
});

export default model("User", UserSchema);
