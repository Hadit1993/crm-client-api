import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { createAccessJWT, verifyRefreshToken } from "../../helpers/jwt.helper";
import { getUserById } from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";
import constants from "../../utils/constants";

export default async function getAccessToken(req: Request, res: Response) {
  let baseResponse: BaseResponse;
  const error = { statusCode: 401, message: constants.unauthorizedError };
  try {
    const { authorization } = req.headers;
    if (!authorization) throw error;
    const refreshToken = authorization.replace("Bearer", "").trim();
    const decoded = verifyRefreshToken(refreshToken) as JwtPayload;
    if (!decoded.id) throw error;
    const user = await getUserById(decoded.id);
    if (!user) throw error;
    let tokenExp =
      user.refreshJWT.addedAt.getDate() +
      parseInt(process.env.JWT_REFRESH_SECRET_EXP_DAY as string);
    const today = new Date().getDate();
    if (tokenExp < today || refreshToken !== user.refreshJWT.token) throw error;
    const accessToken = createAccessJWT({ email: user.email, id: user.id });
    baseResponse = new BaseResponse({
      data: accessToken,
      message: "access token retrieved successfully",
    });
    res.json(baseResponse);
  } catch (error: any) {
    const statusCode = error.statusCode || 400;
    baseResponse = new BaseResponse({
      success: false,
      statusCode,
      message: error.message,
    });
    res.status(statusCode).json(baseResponse);
  }
}
