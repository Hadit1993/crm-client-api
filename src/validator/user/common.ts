import { body } from "express-validator";

const validateEmail = () =>
  body("email").isEmail().withMessage("email is invalid");

const validatePassword = () =>
  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("password must be between 8 and 100 characters long");

export { validateEmail, validatePassword };
