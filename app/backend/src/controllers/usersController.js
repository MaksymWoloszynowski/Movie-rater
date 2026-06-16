import { pool } from "../db.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      `SELECT
        u.id AS user_id,
        u.username,
        u.is_banned,
        COUNT(r.user_id) AS reviews_count,
        COALESCE(AVG(r.rating), 0) AS average_review
      FROM users u
      LEFT JOIN reviews r ON r.user_id = u.id
      WHERE u.username = $1
      GROUP BY u.id, u.username, u.is_banned;
      `,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

const getUserReviews = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        r.rating,
        r.comment,
        r.created_at,
        m.id AS movie_id,
        m.title AS movie_title,
        m.poster_path AS movie_poster_path,
        m.original_language AS movie_original_language,
        m.release_date AS movie_release_date,
        m.slug AS movie_slug
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN movies m ON r.movie_id = m.id
      WHERE u.username = $1
      ORDER BY r.created_at DESC;
      `,
      [username]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const banUser = async (req, res) => {
  const { username } = req.params;

  if (req.user.username === username) {
    return res.status(400).json({ error: "Cannot ban yourself" });
  }

  try {
    const result = await pool.query(
      `UPDATE users SET is_banned = TRUE WHERE username = $1 RETURNING username, is_banned`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to ban user" });
  }
};

const getCurrentUserStatus = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.status(200).json({
    username: req.user.username,
    is_banned: req.user.is_banned,
    is_admin: req.user.is_admin,
  });
};

const unbanUser = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      `UPDATE users SET is_banned = FALSE WHERE username = $1 RETURNING username, is_banned`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unban user" });
  }
};

export default {
  getUserProfile,
  getUserReviews,
  banUser,
  getCurrentUserStatus,
  unbanUser,
};
