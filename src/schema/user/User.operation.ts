import { IUser, UserModel } from "./User.schema";

const insertUser = async (user: IUser) => {
  try {
    const newUser = await new UserModel(user).save();
    return newUser;
  } catch (error) {
    console.log({ error });
  }
};

export { insertUser };
