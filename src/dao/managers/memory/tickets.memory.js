export class TicketsMemory {
    constructor() {
      this.tickets = [];
    }
  
    createTicket(newTicket) {
      try {
        const ticketCreated = { ...newTicket };
        this.tickets.push(ticketCreated);
        return ticketCreated;
      } catch (error) {
        throw new Error("Error al generar el ticket");
      }
    }
  }