import { Router } from "express";
import createAccount from "../../api/user/createAccount";

const userRouterV1 = Router();

userRouterV1.post("/", createAccount);

export default userRouterV1;
