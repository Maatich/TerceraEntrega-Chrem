import {cartsDao, productsDao, chatsDao} from "../dao/factory.js"

const chatsServices = {};

// Obtener todos los carritos
chatsServices.getCarts = async () => {
    return chatsDao.getChats();
};
// Agregamos un chat
chatsServices.addChat = async (data) => {
    return chatsDao.addChat();    
  };  

export default chatsServices;
