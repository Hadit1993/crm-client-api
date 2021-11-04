import { body } from "express-validator";
import authorizeUser from "../../middlewares/authorization.middleware";
import errorMiddleWare from "../../middlewares/error.middleware";

const validate = (field: string, max: number) =>
  body(field)
    .trim()
    .not()
    .isEmpty()
    .withMessage(`${field} is required`)
    .isLength({ max })
    .withMessage(`${field} must be maximum ${max} characters long`);

const createTicketValidations = [
  validate("subject", 100),
  validate("sender", 50),
  validate("message", 1000),
  errorMiddleWare,
  authorizeUser,
];

export default createTicketValidations;
