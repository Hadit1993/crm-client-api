import { Request, Response } from "express";
import { deleteJWTFromRedis } from "../../helpers/redis.helper";
import { storeRefreshJWT } from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function logout(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;
    const id = req.userId;
    const token = authorization!.replace("Bearer", "").trim();
    deleteJWTFromRedis(token);
    await storeRefreshJWT(id!, "");
    res.json(
      new BaseResponse({ message: "you have been logged out successfully" })
    );
  } catch (error: any) {
    res
      .status(400)
      .json(new BaseResponse({ success: false, message: error.message }));
  }
}
