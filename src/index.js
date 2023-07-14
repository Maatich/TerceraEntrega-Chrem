import app from "./server.js";
//import { connectDB } from "./config/connectDB.js";
import { Server, Socket } from "socket.io";
import {chatsDao} from "./dao/factory.js";



const server = app.listen(app.get("port"), ()=>{
    console.log('Servicio funcionando en el puerto: ' + app.get("port"));
})

const io = new Server(server);
const messages = [];

io.on("connection", async (Socket) => {
  Socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
    chatsDao.addChat(data);
  });
  Socket.on("authenticated", (data) => {
    Socket.broadcast.emit("newUserConnected", data);
  });
});