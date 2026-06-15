import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const getTokenRoles = (decodedToken) => {
  const realmRoles = decodedToken.realm_access?.roles || [];
  const resourceRoles = Object.values(decodedToken.resource_access || {})
    .flatMap((resource) => resource.roles || []);

  return [...new Set([...realmRoles, ...resourceRoles])];
};

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

    const roles = getTokenRoles(decodedToken);
    const isAdmin = roles.includes("admin");

    let user = await pool.query(
      `SELECT * FROM users WHERE keycloak_id = $1`,
      [decodedToken.sub]
    );

    if (user.rows.length === 0) {
      user = await pool.query(
        `INSERT INTO users (username, email, keycloak_id) VALUES ($1, $2, $3) RETURNING *`,
        [decodedToken.preferred_username, decodedToken.email, decodedToken.sub]
      );
    }

    const currentUser = user.rows[0];

    req.user = {
      ...currentUser,
      is_admin: isAdmin,
      roles,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export const rejectBanned = (req, res, next) => {
  if (req.user?.is_banned) {
    return res.status(403).json({ message: "Account is banned" });
  }

  next();
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};

export default authenticateToken;