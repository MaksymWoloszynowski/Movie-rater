import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { pool } from "./db.js";

const app = express();

const ensureSchema = async () => {
  try {
    await pool.query(
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN NOT NULL DEFAULT FALSE;`
    );
  } catch (error) {
    console.error("Failed to ensure schema:", error);
  }
};

ensureSchema();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser())
app.use("/api", router)

export default app