import { model, Model, Schema } from "mongoose";

interface IResetPin {
  pin?: string;
  email: string;
}

const ResetPinSchema = new Schema<IResetPin, Model<IResetPin>, IResetPin>({
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
});

const ResetPinModel = model<IResetPin>("ResetPin", ResetPinSchema);

export { ResetPinModel };
