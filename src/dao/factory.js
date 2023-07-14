import {options} from "../config/config.js";
//import __dirname from "../utils.js"

const persistence = options.server.persistence;

let cartsDao;
let productsDao;
let chatsDao;
let ticketsDao;

switch (persistence) {
    case "mongo":
        const {connectDB} = await import("../config/connectDB.js");
        connectDB();
        const {CartsMongo} = await import("./managers/mongo/carts.mongo.js");
        cartsDao = new CartsMongo();
        const {ProductsMongo} = await import("./managers/mongo/products.mongo.js");
        productsDao = new ProductsMongo();
        const {ChatsMongo} = await import("./managers/mongo/chats.mongo.js");
        chatsDao = new ChatsMongo();
        const {TicketsMongo} = await import("./managers/mongo/tickets.mongo.js");
        ticketsDao = new TicketsMongo();
    break;
    
    case "memory":
        const {CartsMemory} = await import("./managers/memory/carts.memory.js");
        cartsDao = new CartsMemory();
        const {ProductsMemory} = await import("./managers/memory/products.memory.js");
        productsDao = new ProductsMemory();
        const {ChatsMemory} = await import("./managers/memory/chats.memory.js");
        chatsDao = new ChatsMemory();
        const {TicketsMemory} = await import("./managers/memory/tickets.memory.js");
        ticketsDao = new TicketsMemory();
    break;

}

export { cartsDao, productsDao, chatsDao, ticketsDao };