import express from "express";
import { createSession, getSession } from "../controllers/sessionsController.js";

const router = express.Router();

router.post("/create", createSession);
router.get("/get/:id", getSession);

export default router;