import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plainPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hashSync(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("hashPassword error:", error);
  }
};

const comparePassword = (plainPassword: string, hashPassword: string) =>
  bcrypt.compare(plainPassword, hashPassword);

export { hashPassword, comparePassword };
