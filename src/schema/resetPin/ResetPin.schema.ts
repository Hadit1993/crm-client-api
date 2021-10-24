import { Document, model, Model, Schema, Types } from "mongoose";

interface IResetPin {
  pin?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResetPinSchema = new Schema<IResetPin, Model<IResetPin>, IResetPin>(
  {
    pin: {
      type: String,
      maxlength: 6,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ResetPinModel = model<IResetPin>("ResetPin", ResetPinSchema);

type ResetPinDocument = Document<any, any, IResetPin> &
  IResetPin & {
    _id: Types.ObjectId;
  };

export { ResetPinModel, ResetPinDocument, IResetPin };
