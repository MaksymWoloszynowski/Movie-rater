import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js"
import { pool } from "./db.js";

const app = express();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

app.use(express.json());
app.use(cookieParser())
app.use("/api", router)

app.get('/api/health', async (req, res) => {
  const postgresStatus = 'down';

  try {
    await pool.query(`SELECT 1`)
    postgresStatus = 'up'
  } catch {}

  const status = postgresStatus === 'up'

  res.status(200).json({
    status,
    postgres: postgresStatus,
    uptime: process.uptime(),
  });
})

export default app