import { pool } from "../db.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query(
      `SELECT
        u.id AS user_id,
        u.username,
        COUNT(r.user_id) AS reviews_count,
        COALESCE(AVG(r.rating), 0) AS average_review
      FROM users u
      LEFT JOIN reviews r ON r.user_id = u.id
      WHERE u.username = $1
      GROUP BY u.id, u.username;
      `,
      [username],
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
      [username],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export default {
  getUserProfile,
  getUserReviews,
};
