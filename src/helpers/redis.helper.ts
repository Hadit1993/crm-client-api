import redis from "redis";

const client = redis.createClient({ url: process.env.REDIS_URL });

const saveJWTToRedis = (key: string, value: string) => client.set(key, value);

const retrieveJWTFromRedis = (key: "access" | "refresh") => {
  return new Promise<string>((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) return reject(error);
      if (!result) return reject(new Error("no jwt found"));
      return resolve(result);
    });
  });
};

export { saveJWTToRedis, retrieveJWTFromRedis };
