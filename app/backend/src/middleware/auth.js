import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const authenticateToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    const public_key =
      "-----BEGIN PUBLIC KEY-----\n" +
      process.env.PUBLICKEY +
      "\n-----END PUBLIC KEY-----";

    const decodedToken = jwt.verify(token, public_key, {
      algorithms: ["RS256"],
    });

    let user = await pool.query(
      `SELECT * FROM users WHERE keycloak_id = $1`,
      [decodedToken.sub]
    )

    if (user.rows.length === 0) {
      user = await pool.query(
        `INSERT INTO users (username, email, keycloak_id) VALUES ($1, $2, $3) RETURNING *`,
        [decodedToken.preferred_username, decodedToken.email, decodedToken.sub]
      )
    }

    req.user = user.rows[0];

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default authenticateToken;