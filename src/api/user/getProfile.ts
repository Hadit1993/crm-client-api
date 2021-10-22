import { Request, Response } from "express";
import { getUserById } from "../../schema/user/User.operation";
import { UserDocument, UserModel } from "../../schema/user/User.schema";
import BaseResponse from "../../utils/BaseResponse";
import constants from "../../utils/constants";

export default async function getProfile(req: Request, res: Response) {
  try {
    await tryGetProfile(req, res);
  } catch (error: any) {
    handleError(error, res);
  }
}

const tryGetProfile = async (req: Request, res: Response) => {
  const user = await getUser(req);
  const baseResponse = getResponse(user);
  res.json(baseResponse);
};

const getUser = async (req: Request) => {
  const { userId } = req;
  const user = await getUserById(userId!);
  if (!user) throw new Error(constants.userNotFound);
  return user;
};

const getResponse = (user: UserDocument) => {
  return new BaseResponse({
    data: user,
    message: "user data retrieved successfully",
  });
};

const handleError = (error: any, res: Response) => {
  const baseResponse = new BaseResponse({
    success: false,
    message: error.message,
    statusCode: 400,
  });
  res.status(400).json(baseResponse);
};
