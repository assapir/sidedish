import { RedisClientOptions, createClient } from "redis";

export async function setupRedis(): Promise<void> {
  const redisOptions: RedisClientOptions = {
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: (attempts) => {
        if (attempts > 3) {
          // Try to reconnect 3 times
          // This error is caught by limiter and then insurance limiter is used in this case
          return new Error("Retry time exhausted");
        }
        return attempts * 100;
      },
    },
  };

  const redisClient = createClient(redisOptions);
  redisClient.on("error", (error) => {
    console.log(
      `Got error from Redis: ${error.message}. Probably nothing we can do about it`
    );
  });
  await redisClient.connect();
}
