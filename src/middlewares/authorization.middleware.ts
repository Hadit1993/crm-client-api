import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../helpers/jwt.helper";
import {
  deleteJWTFromRedis,
  retrieveJWTFromRedis,
} from "../helpers/redis.helper";
import BaseResponse from "../utils/BaseResponse";
import constants from "../utils/constants";

export default async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await tryAuthorizeUser(req, next);
  } catch (error) {
    handleError(res);
  }
}

const tryAuthorizeUser = async (req: Request, next: NextFunction) => {
  const token = checkAuthorization(req);
  const decoded = decodeToken(token);
  const userId = await getUserId(token);
  validateUserId(userId, decoded);
  req.userId = userId;
  next();
};

const checkAuthorization = (req: Request) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error();
  const token = authorization.replace("Bearer", "").trim();
  return token;
};

const decodeToken = (token: string) => {
  const decoded = verifyAccessToken(token) as JwtPayload;

  if (!decoded["id"]) {
    deleteJWTFromRedis(token);
    throw new Error();
  }
  return decoded;
};

const getUserId = async (token: string) => {
  const userId = await retrieveJWTFromRedis(token);
  if (!userId) throw new Error();
  return userId;
};

const validateUserId = (userId: string, decoded: JwtPayload) => {
  if (userId !== decoded["id"]) throw new Error();
};

const handleError = (res: Response) => {
  const baseResponse = new BaseResponse({
    success: false,
    statusCode: 401,
    message: constants.unauthorizedError,
  });
  res.status(401).json(baseResponse);
};
