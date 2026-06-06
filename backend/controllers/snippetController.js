import Snippet from "../models/Snippet.js";
import { nanoid } from "nanoid";

export const createSnippet = async (req, res) => {
  try {
    const { title, code, language } = req.body;
    if (!code) return res.status(400).json({ error: "Code is required" });

    const snippet = await Snippet.create({
      slug: nanoid(8),
      title,
      code,
      language,
    });
    res.status(201).json({ slug: snippet.slug });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ slug: req.params.slug });
    if (!snippet) return res.status(404).json({ error: "Not found" });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};