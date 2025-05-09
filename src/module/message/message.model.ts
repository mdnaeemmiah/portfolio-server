import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.intarface";

const MessageSchema = new Schema<IMessage>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      subject: { type: String, required: true },
      message: { type: String, required: true },
    },
    { timestamps: true } 
  );
  
  // Create and export the model
  export const MessageModel = mongoose.model<IMessage>("MessageModel", MessageSchema);
