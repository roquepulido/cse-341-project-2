import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    oauthId: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
