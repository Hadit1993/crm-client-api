import { Request, Response } from "express";
import { hashPassword } from "../../helpers/bcrypt.helper";
import { insertUser } from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function createAccount(req: Request, res: Response) {
  let baseResponse: BaseResponse;
  try {
    const password = await hashPassword(req.body.password);
    if (!password) throw new Error();
    const result = await insertUser({ ...req.body, password });
    if (!result) throw new Error();
    const statusCode = 201;
    baseResponse = new BaseResponse({
      data: result,
      message: "new user created",
      statusCode,
    });
    res.status(statusCode).json(baseResponse);
  } catch (error) {
    const statusCode = 400;
    baseResponse = new BaseResponse({ success: false, statusCode });
    res.status(statusCode).json(baseResponse);
  }
}
