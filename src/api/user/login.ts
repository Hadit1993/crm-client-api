import { json, Request, Response } from "express";
import { comparePassword } from "../../helpers/bcrypt.helper";
import { getUserByEmail } from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function login(request: Request, response: Response) {
  const baseResponse: BaseResponse = new BaseResponse({});

  const { email, password } = request.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) throw { statusCode: 404, message: "user not found" };
    const isUserValid = await comparePassword(password, user.password);
    if (!isUserValid) throw { message: "email and password do not match" };
    baseResponse.success = true;
    baseResponse.data = user;
    baseResponse.message = "user signed in successfully";
    response.json(baseResponse);
  } catch (error: any) {
    const statusCode = error.statusCode || 400;
    baseResponse.success = false;
    baseResponse.statusCode = statusCode;
    baseResponse.message = error.message;
    response.status(statusCode).json(baseResponse);
  }
}
