import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { createAccessJWT, verifyRefreshToken } from "../../helpers/jwt.helper";
import { getUserById } from "../../schema/user/User.operation";
import { UserDocument } from "../../schema/user/User.schema";
import BaseResponse from "../../utils/BaseResponse";
import constants from "../../utils/constants";

const error = { statusCode: 401, message: constants.unauthorizedError };

export default async function getAccessToken(req: Request, res: Response) {
  try {
    await tryGetAccessToken(req, res);
  } catch (error: any) {
    handleError(error, res);
  }
}

const tryGetAccessToken = async (req: Request, res: Response) => {
  const refreshToken = checkAuthorization(req);
  const decoded = decodeRefreshToken(refreshToken);
  const user = await getUser(decoded);
  const tokenExp = calculateTokenExpiration(user);
  checkExpiration(tokenExp, user, refreshToken);
  const response = calculateResponse(user);
  res.json(response);
};

const checkAuthorization = (req: Request) => {
  const { authorization } = req.headers;
  if (!authorization) throw error;
  const refreshToken = authorization.replace("Bearer", "").trim();
  return refreshToken;
};

const decodeRefreshToken = (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken) as JwtPayload;
  if (!decoded.id) throw error;
  return decoded;
};

const getUser = async (decodedToken: JwtPayload) => {
  const user = await getUserById(decodedToken.id);
  if (!user) throw error;
  return user;
};

const calculateTokenExpiration = (user: UserDocument) => {
  return (
    user.refreshJWT.addedAt.getDate() +
    parseInt(process.env.JWT_REFRESH_SECRET_EXP_DAY as string)
  );
};

const checkExpiration = (
  tokenExp: number,
  user: UserDocument,
  refreshToken: string
) => {
  const today = new Date().getDate();
  if (tokenExp < today || refreshToken !== user.refreshJWT.token) throw error;
};

const calculateResponse = (user: UserDocument) => {
  const accessToken = createAccessJWT({ email: user.email, id: user.id });
  const baseResponse = new BaseResponse({
    data: accessToken,
    message: "access token retrieved successfully",
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
