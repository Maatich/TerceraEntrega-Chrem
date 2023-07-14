import ticketsModel from "../../models/tickets.models.js";

export class TicketsMongo {

  // Creamos un nuevo ticket
  createTicket = async (newTicket) => {
    try {
      const ticketCreated = await ticketsModel.create(newTicket);
      return {
        code: 202,
        status: "Success",
        message: `El ticket ha sido agregado con éxito`,
      };
    } catch (error) {
      return {
        code: 400,
        status: "Error",
        message: `${error}`,
      };
    }
  };
}
