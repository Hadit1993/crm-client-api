import { Request, Response } from "express";
import { setPasswordResetPin } from "../../schema/resetPin/ResetPin.operation";
import { getUserByEmail } from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function resetPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (!user) throw { statusCode: 404, message: "user not found" };
    const resetPin = await setPasswordResetPin(email);
    res.status(201).json(
      new BaseResponse({
        data: resetPin,
        statusCode: 201,
        message: "reset pin created successfully",
      })
    );
  } catch (error: any) {
    const { statusCode, message } = error;
    res
      .status(statusCode || 400)
      .json(new BaseResponse({ statusCode, message, success: false }));
  }
}
