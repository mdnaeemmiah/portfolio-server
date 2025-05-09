import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { messageService } from "./message.service";
import multer from "multer";


// Create a new message
const createMessage = catchAsync(async (req: Request, res: Response) => {
  const validatedData = req.body

  const newMessage = await messageService.createMessage(validatedData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Message created successfully!",
    data: newMessage,
  });
});


// Get all messages
const getAllMessages = catchAsync(async (_req: Request, res: Response) => {
  const messages = await messageService.getAllMessages();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Messages retrieved successfully",
    data: messages,
  });
});

export const messageController = {
  createMessage,
  getAllMessages,
};


