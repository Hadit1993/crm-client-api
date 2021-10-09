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
    const { authorization } = req.headers;

    if (!authorization) throw new Error();
    const token = authorization.replace("Bearer", "").trim();

    const decoded = verifyAccessToken(token) as JwtPayload;

    if (!decoded["id"]) {
      deleteJWTFromRedis(token);
      throw new Error();
    }
    const userId = await retrieveJWTFromRedis(token);
    if (!userId) throw new Error();
    if (userId !== decoded["id"]) throw new Error();
    req.userId = userId;
    next();
  } catch (error) {
    const baseResponse = new BaseResponse({
      success: false,
      statusCode: 401,
      message: constants.unauthorizedError,
    });
    res.status(401).json(baseResponse);
  }
}
