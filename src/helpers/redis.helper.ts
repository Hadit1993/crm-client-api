import redis from "redis";

const client = redis.createClient({ url: process.env.REDIS_URL });

const saveJWTToRedis = (key: string, value: string) => client.set(key, value);

const retrieveJWTFromRedis = (key: string) => {
  return new Promise<string | null>((resolve, reject) => {
    client.get(key, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

const deleteJWTFromRedis = (key: string) => client.del(key);

export { saveJWTToRedis, retrieveJWTFromRedis, deleteJWTFromRedis };
