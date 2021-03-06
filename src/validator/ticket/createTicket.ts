import authorizeUser from "../../middlewares/authorization.middleware";
import errorMiddleWare from "../../middlewares/error.middleware";
import { validateTicketParams } from "./common";

const createTicketValidations = [
  validateTicketParams("subject", 100),
  validateTicketParams("sender", 50),
  validateTicketParams("message", 1000),
  errorMiddleWare,
  authorizeUser,
];

export default createTicketValidations;
