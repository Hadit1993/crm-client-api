import { Router } from "express";
import createAccount from "../../api/user/createAccount";
import getProfile from "../../api/user/getProfile";
import login from "../../api/user/login";
import logout from "../../api/user/logout";
import resetPassword from "../../api/user/resetPassword";
import updatePassword from "../../api/user/updatePassword";
import authorizeUser from "../../middlewares/authorization.middleware";

import registerValidations from "../../validator/user/createAccount";
import loginValidations from "../../validator/user/login";
import resetPasswordValidation from "../../validator/user/resetPassword";
import updatePasswordValidations from "../../validator/user/updatePassword";

const userRouterV1 = Router();

userRouterV1
  .route("/")
  .post(registerValidations, createAccount)
  .get(authorizeUser, getProfile);

userRouterV1.post("/login", loginValidations, login);

userRouterV1
  .route("/reset-password")
  .post(resetPasswordValidation, resetPassword)
  .patch(updatePasswordValidations, updatePassword);

userRouterV1.delete("/logout", authorizeUser, logout);

export default userRouterV1;
