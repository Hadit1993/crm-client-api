import randomGenerator from "../../utils/randomGenerator";
import { ResetPinModel } from "./ResetPin.schema";

const setPasswordResetPin = async (email: string) => {
  const pinLength = 6;
  const randomPin = randomGenerator(pinLength);
  const resetPin = await new ResetPinModel({ email, pin: randomPin }).save();
  return resetPin;
};

export { setPasswordResetPin };
