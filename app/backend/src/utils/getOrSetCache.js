import { redisClient } from "../redis.js";

export async function getOrSetCache(key, ttl, cb) {
  const cached = await redisClient.get(key);

  if (cached) {
    return {
      value: JSON.parse(cached),
      hit: true
    };
  }

  const freshData = await cb();

  await redisClient.setEx(key, ttl, JSON.stringify(freshData));

  return {
    value: freshData,
    hit: false
  };
}

