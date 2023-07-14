export class ChatsMemory {
  constructor() {
    this.chats = [];
  }

  getChats() {
    return this.chats;
  }

  addChat(data) {
    const newChat = {
      _id: generateID(),
      user: data.user,
      message: data.message,
    };
    this.chats.push(newChat);
    return newChat;
  }
}

// Función para generar un ID único en memoria
function generateID() {
  return Math.random().toString(36).substring(2, 15);
}
