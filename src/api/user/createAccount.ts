import { Request, Response } from "express";

import { hashPassword } from "../../helpers/bcrypt.helper";
import { insertUser } from "../../schema/user/User.operation";
import { IUser, UserDocument } from "../../schema/user/User.schema";
import BaseResponse from "../../utils/BaseResponse";

export default async function createAccount(req: Request, res: Response) {
  try {
    await tryCreateAccount(req, res);
  } catch (error) {
    handleError(error, res);
  }
}

const tryCreateAccount = async (req: Request, res: Response) => {
  const hashedPassword = await getHashedPassword(req);
  const result = await createUser(req, hashedPassword);
  const response = assembleResponse(result);
  res.status(201).json(response);
};

const getHashedPassword = async (req: Request) => {
  const body: IUser = req.body;
  const hashedPassword = await hashPassword(body.password);
  if (!hashedPassword) throw new Error();
  return hashedPassword;
};

const createUser = async (req: Request, hashedPassword: string) => {
  const result = await insertUser({ ...req.body, password: hashedPassword });
  if (!result) throw new Error();
  return result;
};

const assembleResponse = (result: UserDocument) => {
  const statusCode = 201;
  const baseResponse = new BaseResponse({
    data: result,
    message: "new user created",
    statusCode,
  });
  return baseResponse;
};

const handleError = (error: any, res: Response) => {
  const statusCode = 400;
  const baseResponse = new BaseResponse({ success: false, statusCode });
  res.status(statusCode).json(baseResponse);
};
