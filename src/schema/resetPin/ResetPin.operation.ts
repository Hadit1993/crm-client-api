import randomGenerator from "../../utils/randomGenerator";
import { IResetPin, ResetPinModel } from "./ResetPin.schema";

const setPasswordResetPin = async (email: string) => {
  return new Promise<IResetPin | null>((resolve, reject) => {
    const pinLength = 6;
    const randomPin = randomGenerator(pinLength);

    ResetPinModel.findOneAndUpdate(
      { email },
      {
        $set: {
          pin: randomPin,
          email,
        },
      },
      { upsert: true, new: true },
      (error, doc) => {
        if (error) return reject(error);
        resolve(doc);
      }
    );
  });
};

const validatePinWithEmail = async (email: string, pin: string) => {
  const resetPin = await ResetPinModel.findOne({ email, pin });
  return resetPin;
};

const deleteResetPin = async (email: string) => {
  const result = await ResetPinModel.deleteOne({ email });
  return result;
};

export { setPasswordResetPin, validatePinWithEmail, deleteResetPin };
