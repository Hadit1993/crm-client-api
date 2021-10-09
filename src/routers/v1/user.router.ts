import { Router } from "express";
import createAccount from "../../api/user/createAccount";
import getProfile from "../../api/user/getProfile";
import login from "../../api/user/login";
import authorizeUser from "../../middlewares/authorization.middleware";

import registerValidations from "../../validator/user/createAccount";
import loginValidations from "../../validator/user/login";

const userRouterV1 = Router();

userRouterV1
  .route("/")
  .post(registerValidations, createAccount)
  .get(authorizeUser, getProfile);

userRouterV1.post("/login", loginValidations, login);

export default userRouterV1;
