import { Router } from "express";
import createAccount from "../../api/user/createAccount";
import login from "../../api/user/login";

import registerValidations from "../../validator/user/createAccount";
import loginValidations from "../../validator/user/login";

const userRouterV1 = Router();

userRouterV1.post("/", registerValidations, createAccount);

userRouterV1.post("/login", loginValidations, login);

export default userRouterV1;
