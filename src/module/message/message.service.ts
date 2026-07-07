import { IMessage } from "./message.intarface";
import { MessageModel } from "./message.model";



const createMessage = async (data: IMessage) => {
  const result = await MessageModel.create(data);
  return result;
};



const getAllMessages = async () => {
  const result = await MessageModel.find();
  return result;
};

const deleteMessage = async (id: string) => {
  const result = await MessageModel.findByIdAndDelete(id);
  return result;
};


export const messageService = {
  createMessage,
  getAllMessages,
  deleteMessage,
};
