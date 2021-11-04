import { ITiCket, TicketModel } from "./ticket.schema";

const insertTicket = (ticket: Partial<ITiCket>) => {
  return new TicketModel(ticket).save();
};

export { insertTicket };
