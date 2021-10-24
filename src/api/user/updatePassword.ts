import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../../helpers/bcrypt.helper";
import { notifyPasswordUpdate } from "../../helpers/emailHelper";
import {
  deleteResetPin,
  validatePinWithEmail,
} from "../../schema/resetPin/ResetPin.operation";
import { IResetPin } from "../../schema/resetPin/ResetPin.schema";
import {
  getUserByEmail,
  insertNewPassword,
} from "../../schema/user/User.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function updatePassword(req: Request, res: Response) {
  try {
    await tryUpdatePassword(req, res);
  } catch (error: any) {
    catchError(error, res);
  }
}

const tryUpdatePassword = async (req: Request, res: Response) => {
  const { email, pin, newPassword } = req.body;

  const user = await getUser(email);

  const resetPin = await getResetPin(email, pin);

  checkIfPinExpires(resetPin);

  await checkIfNewPasswordDuplicate(newPassword, user.password);

  const hashedNewPassword = await getHashedNewPassword(newPassword);

  await insertNewPassword(email, hashedNewPassword);

  notifyPasswordUpdate(email);

  deleteResetPin(email);

  sendResponse(res);
};

const getUser = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw {
      errors: { email: "no user with this email found" },
      statusCode: 404,
    };
  }
  return user;
};

const getResetPin = async (email: string, pin: string) => {
  const resetPin = await validatePinWithEmail(email, pin);

  if (!resetPin)
    throw {
      errors: {
        pin: "your pin is invalid",
      },
    };
  return resetPin;
};

const checkIfPinExpires = (resetPin: IResetPin) => {
  const pinUpdatedDate = resetPin.updatedAt;
  const expiresInMs = 86400000;
  const expireDate = pinUpdatedDate.setTime(
    pinUpdatedDate.getTime() + expiresInMs
  );
  if (expireDate < new Date().getTime())
    throw {
      errors: {
        pin: "your pin is expired",
      },
    };
};

const checkIfNewPasswordDuplicate = async (
  newPassword: string,
  oldPassword: string
) => {
  const isNewPasswordDuplicate = await comparePassword(
    newPassword,
    oldPassword
  );
  if (isNewPasswordDuplicate)
    throw {
      errors: {
        newPassword:
          "your new password should not be the same as your current password",
      },
    };
};

const getHashedNewPassword = async (newPassword: string) => {
  const hashedNewPassword = await hashPassword(newPassword);
  if (!hashedNewPassword)
    throw {
      errors: { newPassword: "your new password is invalid" },
    };
  return hashedNewPassword;
};

const sendResponse = (res: Response) =>
  res.json(
    new BaseResponse({
      message: "your password updated successfully",
    })
  );

const catchError = (error: any, res: Response) => {
  const { errors, statusCode } = error;
  res.status(statusCode || 400).json(
    new BaseResponse({
      success: false,
      statusCode,
      error: errors,
      message: errors ? "some inputs are invalid" : undefined,
    })
  );
};
