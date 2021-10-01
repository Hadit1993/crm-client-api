import { model, Model, Schema } from "mongoose";

interface IUser {
  name: string;
  company: string;
  address?: string;
  phone?: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser, Model<IUser>, IUser>({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  company: {
    type: String,
    maxlength: 50,
    required: true,
  },
  address: {
    type: String,
    maxlength: 100,
  },
  phone: {
    type: String,
    maxlength: 11,
    unique: true,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject() as any;
  delete user.password;
  delete user.__v;
  return user;
};

const UserModel = model<IUser>("User", UserSchema);
export { UserModel, IUser };
