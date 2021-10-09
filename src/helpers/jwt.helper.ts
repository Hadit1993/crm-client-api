import jwt from "jsonwebtoken";
import { storeRefreshJWT } from "../schema/user/User.operation";
import { saveJWTToRedis } from "./redis.helper";

const createAccessJWT = (payload: { email: string; id: string }) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "15m",
    }
  );

  saveJWTToRedis(accessToken, payload.id);
  return accessToken;
};

const createRefreshJWT = async (payload: { email: string; id: string }) => {
  const refreshToken = await jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
  await storeRefreshJWT(payload.id, refreshToken);
  return refreshToken;
};

const verifyAccessToken = (accessToken: string) =>
  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);

export { createAccessJWT, createRefreshJWT, verifyAccessToken };
