import { body } from "express-validator";
import { hashPassword } from "../../helpers/bcrypt.helper";
import errorMiddleWare from "../../middlewares/error.middleware";
import { validateEmail } from "./common";

const validatePin = () =>
  body("pin")
    .not()
    .isEmpty()
    .withMessage("pin is required")
    .custom((pin: string) => {
      const isDigit = /^\d+$/.test(pin);
      if (isDigit && pin.length === 6) return true;
      else throw "your pin is in wrong format";
    });

const validateNewPassword = () =>
  body("newPassword")
    .isLength({ min: 8, max: 100 })
    .withMessage("password must be between 8 and 100 characters long");
const updatePasswordValidations = [
  validateEmail(),
  validatePin(),
  validateNewPassword(),
  errorMiddleWare,
];

export default updatePasswordValidations;
