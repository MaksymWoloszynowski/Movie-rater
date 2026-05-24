import { pool } from "../db.js";
import { redisClient } from "../redis.js";

const checkHealth = async (req, res) => {
  let postgresStatus = "down";
  let redisStatus = "down";

  try {
    await pool.query("SELECT 1");
    postgresStatus = "up";
  } catch (err) {
    console.error("Postgres healthcheck failed:", err.message);
  }

  try {
    const pong = await redisClient.ping();
    if (pong === "PONG") {
      redisStatus = "up";
    }
  } catch (err) {
    console.error("Redis healthcheck failed:", err.message);
  }

  const isHealthy = postgresStatus === "up" && redisStatus === "up";

  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    postgres: postgresStatus,
    redis: redisStatus,
    uptime: process.uptime(),
  });
};

export default {
  checkHealth,
};