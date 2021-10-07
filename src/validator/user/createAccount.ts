import { body, check } from "express-validator";
import errorMiddleWare from "../../middlewares/errorMiddleware";
import {
  getUserByEmail,
  getUserByPhone,
} from "../../schema/user/User.operation";

const registerValidateName = (field: string) =>
  body(field)
    .trim()
    .isLength({ max: 50, min: 3 })
    .withMessage(`${field} must be between 3 and 50 characters long`);

const registerValidateAddress = () =>
  body("address")
    .trim()
    .isLength({ max: 100 })
    .withMessage("address must not exceeds 100 characters");

const registerValidatePhone = () =>
  check("phone")
    .if((phone: string | null | undefined) => {
      return phone != null && phone != undefined;
    })
    .trim()
    .isMobilePhone("fa-IR")
    .withMessage("phone is invalid")
    .custom(async (phone) => {
      const user = await getUserByPhone(phone);

      if (user) throw "a user with this phone already exists";
      else return true;
    });
const registerValidateEmail = () =>
  body("email")
    .isEmail()
    .withMessage("email is invalid")
    .custom(async (email) => {
      const user = await getUserByEmail(email);
      if (user) throw "a user with this email already exists";
      else return true;
    });

const registerValidatePassword = () =>
  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("password must be between 8 and 100 characters long");

const registerValidations = [
  registerValidateName("name"),
  registerValidateName("company"),
  registerValidateAddress(),
  registerValidatePhone(),
  registerValidateEmail(),
  registerValidatePassword(),
  errorMiddleWare,
];

export default registerValidations;
