import express from "express";
import { deleteUser, getUser, like, dislike, subscribe, unsubscribe, updateUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, updateUser)

// DELETE USER
router.delete("/:id", verifyToken, deleteUser)

// GET USER
router.get("/:id", getUser)

// SUBSCRIBE
router.put("/subscribe/:id", verifyToken, subscribe) // this id belongs to the other channel's id

// UNSUBSCRIBE
router.put("/unsubscribe/:id", verifyToken, unsubscribe)

// LIKE
router.put("/like/:videoId", verifyToken, like)

// DISLIKE
router.put("/dislike/:videoId", verifyToken, dislike)

export default router;