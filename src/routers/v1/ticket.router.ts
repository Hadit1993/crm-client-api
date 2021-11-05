import { Router } from "express";
import createTicket from "../../api/ticket/createTicket";
import getAllTickets from "../../api/ticket/getAllTickets";
import getTicket from "../../api/ticket/getTicket";
import authorizeUser from "../../middlewares/authorization.middleware";

import createTicketValidations from "../../validator/ticket/createTicket";

const ticketRouterV1 = Router();

ticketRouterV1.get("/:ticketId", authorizeUser, getTicket);

ticketRouterV1
  .route("/")
  .get(authorizeUser, getAllTickets)
  .post(createTicketValidations, createTicket);

export default ticketRouterV1;
