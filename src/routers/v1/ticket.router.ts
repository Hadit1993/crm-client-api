import { Router } from "express";
import createTicket from "../../api/ticket/createTicket";

import createTicketValidations from "../../validator/ticket/createTicket";

const ticketRouterV1 = Router();

ticketRouterV1.post("/", createTicketValidations, createTicket);

export default ticketRouterV1;
