import { Router } from "express";
import getAccessToken from "../../api/token/getAccessToken";

const tokenRouter = Router();

tokenRouter.get("/fresh-access-jwt", getAccessToken);

export default tokenRouter;
