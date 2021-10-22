import errorMiddleWare from "../../middlewares/error.middleware";
import { validateEmail } from "./common";

const resetPasswordValidation = [validateEmail(), errorMiddleWare];
export default resetPasswordValidation;
