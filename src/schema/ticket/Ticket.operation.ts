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

const updateClientReply = (props: {
  ticketId: string;
  clientId: string;
  message: string;
  sender: string;
}) => {
  return TicketModel.findOneAndUpdate(
    {
      clientId: props.clientId,
      _id: props.ticketId,
    },
    {
      status: "Pending operator response",
      $push: {
        conversations: { message: props.message, sender: props.sender },
      },
    },
    { new: true }
  );
};

const updateStatusClose = (clientId: string, ticketId: string) => {
  return TicketModel.findOneAndUpdate(
    {
      clientId,
      _id: ticketId,
    },
    {
      status: "Closed",
    },
    { new: true }
  );
};

const removeTicket = (clientId: string, ticketId: string) => {
  return TicketModel.findOneAndDelete(
    { clientId, _id: ticketId },
    { new: true }
  );
};

export {
  insertTicket,
  readAllTickets,
  readTicketById,
  updateClientReply,
  updateStatusClose,
  removeTicket,
};
