import chatsModel from "../../models/chats.models.js"

export class ChatsMongo {

  // Recibo los chats
  getChats = async () => {
    const chats = await chatsModel.find();
    return chats;
  };

  // Agregamos un chat
  addChat = async (data) => {
    const newChats =await chatsModel.create(data);
    return newChats    
  };  
};