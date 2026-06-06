import express from "express"
import {createSnippet, getSnippet} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/", createSnippet);
router.get("/:slug", getSnippet);
export default router;
