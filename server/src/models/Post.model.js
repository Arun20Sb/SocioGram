import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    photo: { type: String, required: true }, // Array of photo URLs or file paths
    location: { type: String, required: true },
    tags: { type: [String], default: [] }, // Array of tags
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
