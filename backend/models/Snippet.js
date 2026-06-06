import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, default: "Untitled" },
  code: { type: String, required: true },
  language: { type: String, default: "javascript" },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

export default mongoose.model("Snippet", snippetSchema);