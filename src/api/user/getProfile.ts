import { Request, Response } from "express";
import { getUserById } from "../../schema/user/User.operation";
import { UserModel } from "../../schema/user/User.schema";
import BaseResponse from "../../utils/BaseResponse";

export default async function getProfile(req: Request, res: Response) {
  const { userId } = req;
  let baseResponse: BaseResponse;
  try {
    const user = await getUserById(userId!);
    if (!user) throw new Error("user not found");
    baseResponse = new BaseResponse({
      data: user,
      message: "user data retrieved successfully",
    });
    res.json(baseResponse);
  } catch (error: any) {
    baseResponse = new BaseResponse({
      success: false,
      message: error.message,
      statusCode: 400,
    });
    res.status(400).json(baseResponse);
  }
}
