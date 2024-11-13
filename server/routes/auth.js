import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router();

// SIGN UP
router.post("/signup", signup)

// SIGN IN
router.post("/signin", signin)

// GOOGLE SIGN IN
router.post("/google", googleAuth)

export default router;