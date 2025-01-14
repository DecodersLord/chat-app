import express from "express";
import protectRoute from "../middleware/protectRoutes.js";
import {
    sendMessage,
    receiveMessage,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

router.get("/receive/:id", protectRoute, receiveMessage);

export default router;
