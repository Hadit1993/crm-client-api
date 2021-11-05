import { Router } from "express";
import closeTicket from "../../api/ticket/closeTicket";
import createTicket from "../../api/ticket/createTicket";
import deleteTicket from "../../api/ticket/deleteTicket";
import getAllTickets from "../../api/ticket/getAllTickets";
import getTicket from "../../api/ticket/getTicket";
import updateReplyTicket from "../../api/ticket/updateTicketReply";
import authorizeUser from "../../middlewares/authorization.middleware";

import createTicketValidations from "../../validator/ticket/createTicket";
import updateTicketReplyValidations from "../../validator/ticket/updateTicketReply";

const ticketRouterV1 = Router();

ticketRouterV1
  .route("/:ticketId")
  .get(authorizeUser, getTicket)
  .put(updateTicketReplyValidations, updateReplyTicket)
  .delete(authorizeUser, deleteTicket);

ticketRouterV1.patch("/close-ticket/:ticketId", authorizeUser, closeTicket);

ticketRouterV1
  .route("/")
  .get(authorizeUser, getAllTickets)
  .post(createTicketValidations, createTicket);

export default ticketRouterV1;
