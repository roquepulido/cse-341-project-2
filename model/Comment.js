import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    journalId: {
      type: Schema.Types.ObjectId,
      ref: "Journal",
      required: true
    },
    text: {
      type: String,
      required: true
    },
    commenter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema, "comments");
export default Comment;
