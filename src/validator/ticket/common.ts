import { body } from "express-validator";

const validateTicketParams = (field: string, max: number) =>
  body(field)
    .trim()
    .not()
    .isEmpty()
    .withMessage(`${field} is required`)
    .isLength({ max })
    .withMessage(`${field} must be maximum ${max} characters long`);

export { validateTicketParams };
