import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis client connected");
});

redis.on("error", (error) => {
  console.error(`Redis client error: ${error.message}`);
});

export default redis;
