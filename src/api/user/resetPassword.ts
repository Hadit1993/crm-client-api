import { Request, Response } from "express";
import { emailProcessor } from "../../helpers/email.helper";
import { setPasswordResetPin } from "../../schema/resetPin/ResetPin.operation";
import {
  IResetPin,
  ResetPinDocument,
} from "../../schema/resetPin/ResetPin.schema";
import { getUserByEmail } from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function resetPassword(req: Request, res: Response) {
  try {
    await tryResetPassword(req, res);
  } catch (error: any) {
    catchError(error, res);
  }
}

const tryResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  await checkUserExists(email);
  const resetPin = await getResetPin(email);
  await sendResetPinToEmail(email, resetPin);
  sendResponse(res);
};

const checkUserExists = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw { statusCode: 404, message: "user not found" };
};

const getResetPin = async (email: string) => {
  const resetPin = await setPasswordResetPin(email);

  if (!resetPin || !resetPin.pin) throw new Error();
  return resetPin;
};

const sendResetPinToEmail = async (email: string, resetPin: IResetPin) => {
  const result = await emailProcessor(email, resetPin.pin!);
  if (!result)
    throw new Error(
      "Unable to process your request at the moment. Please try again later."
    );
};

const sendResponse = (res: Response) => {
  res.status(201).json(
    new BaseResponse({
      statusCode: 201,
      message: "password pin sent to your email successfully",
    })
  );
};

const catchError = (error: any, res: Response) => {
  const { statusCode, message } = error;
  res
    .status(statusCode || 400)
    .json(new BaseResponse({ statusCode, message, success: false }));
};
