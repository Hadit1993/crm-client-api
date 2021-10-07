import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { hashPassword } from "../../helpers/bcrypt.helper";
import { insertUser } from "../../schema/user/User.operation";
import { IUser } from "../../schema/user/User.schema";
import BaseResponse from "../../utils/BaseResponse";

export default async function createAccount(req: Request, res: Response) {
  let baseResponse: BaseResponse;
  try {
    const body: IUser = req.body;
    const password = await hashPassword(body.password);
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
