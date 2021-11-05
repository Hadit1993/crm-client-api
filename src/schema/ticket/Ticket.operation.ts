import { ITiCket, TicketModel } from "./ticket.schema";

const insertTicket = (ticket: Partial<ITiCket>) => {
  return new TicketModel(ticket).save();
};

const readAllTickets = (clientId: string) => {
  return TicketModel.find({ clientId });
};

const readTicketById = (clientId: string, ticketId: string) => {
  return TicketModel.findOne({ _id: ticketId, clientId });
};

export { insertTicket, readAllTickets, readTicketById };
