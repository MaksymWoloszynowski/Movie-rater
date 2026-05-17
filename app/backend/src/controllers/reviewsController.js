import { pool } from "../db.js";

const getAllMovieReviews = async (req, res) => {
  const movieId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT * FROM reviews WHERE movie_id = $1`,
      [movieId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie reviews" });
  }
};

const postReview = async (req, res) => {
  const movieId = req.params.id;
  const { comment, rating } = req.body;
  const userId = req.user?.id; // jeśli masz auth

  try {
    const result = await pool.query(
      `INSERT INTO reviews (user_id, movie_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, movieId, rating, comment]
    );

    res.status(201).json({ review: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add a review" });
  }
};

export default {
    getAllMovieReviews,
    postReview
}