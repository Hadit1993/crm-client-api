import { Document, Types } from "mongoose";
import { IUser, UserDocument, UserModel } from "./User.schema";

const insertUser = async (user: IUser) => {
  try {
    const newUser = await new UserModel(user).save();
    return newUser;
  } catch (error) {
    console.log({ insertUserError: error });
  }
};

const getUserByEmail = async (email: string) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      const user = await UserModel.findOne({ email });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByPhone = async (phone: string) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      const user = await UserModel.findOne({ phone });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const storeRefreshJWT = (id: string, token: string) =>
  UserModel.findOneAndUpdate(
    { id },
    {
      $set: {
        "refreshJWT.token": token,
        "refreshJWT.addedAt": Date.now(),
      },
    },
    { new: true }
  );

export { insertUser, getUserByEmail, getUserByPhone, storeRefreshJWT };
