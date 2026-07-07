import express from "express";
import { messageController } from "./message.controller";


const messageRoute = express.Router();

// Create a new message
messageRoute.post("/create", messageController.createMessage);

// Get all messages
messageRoute.get("/", messageController.getAllMessages);

// Delete message
messageRoute.delete("/delete/:id", messageController.deleteMessage);


export default messageRoute;
