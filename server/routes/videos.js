import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, deleteVideo, getVideo, updateVideo, addView, trend, random, sub, getByTags, search } from "../controllers/video.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/views/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTags);
router.get("/search", search);

export default router;