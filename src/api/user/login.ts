import { Request, Response } from "express";
import { comparePassword } from "../../helpers/bcrypt.helper";
import { createAccessJWT, createRefreshJWT } from "../../helpers/jwt.helper";
import { getUserByEmail } from "../../schema/user/User.operation";
import { UserDocument } from "../../schema/user/User.schema";
import BaseResponse from "../../utils/BaseResponse";

export default async function login(req: Request, res: Response) {
  try {
    await tryLogin(req, res);
  } catch (error: any) {
    handleError(error, res);
  }
}

const tryLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getUser(email);
  await checkUserValidation(password, user);
  const baseResponse = await calculateResponse(email, user);
  res.json(baseResponse);
};

const getUser = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw { statusCode: 404, message: "user not found" };
  return user;
};

const checkUserValidation = async (password: string, user: UserDocument) => {
  const isUserValid = await comparePassword(password, user.password);
  if (!isUserValid) throw { message: "email and password do not match" };
};

const calculateResponse = async (email: string, user: UserDocument) => {
  const accessToken = createAccessJWT({ email, id: user.id });
  const refreshToken = await createRefreshJWT({ email, id: user.id });
  const baseResponse = new BaseResponse({
    data: { user, accessToken, refreshToken },
    message: "user signed in successfully",
  });
  return baseResponse;
};

const handleError = (error: any, res: Response) => {
  const statusCode = error.statusCode || 400;
  const baseResponse = new BaseResponse({
    success: false,
    statusCode,
    message: error.message,
  });

  res.status(statusCode).json(baseResponse);
};
