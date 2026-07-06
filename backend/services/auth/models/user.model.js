import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firebaseUid: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    avatarUrl: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
