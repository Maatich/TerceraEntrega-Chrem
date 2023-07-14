import { ticketsDao } from "../dao/factory.js";

const ticketsServices = {};

// Creamos un nuevo ticket
ticketsServices.createTicket = async (newTicket) => {
  return ticketsDao.createTicket(newTicket);
};

export default ticketsServices;