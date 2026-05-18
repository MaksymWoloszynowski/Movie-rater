import { pool } from "../db.js";

const getAllMovieReviews = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const result = await pool.query(
      `SELECT 
            r.comment,
            r.rating,
            r.created_at,
            u.username
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        WHERE r.movie_id = $1;`,
      [movieId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie reviews" });
  }
};

const postReview = async (req, res) => {
  const movieId = req.params.movieId;
  const { comment, rating } = req.body;
  const userId = req.user?.id;

  try {
    const reviewPosted = await pool.query(
        `SELECT * FROM reviews WHERE movie_id = $1 AND user_id = $2`, [movieId, userId]
    )

    if (reviewPosted.rowCount > 0) {
        return res.status(400).json({ error: "Review already posted" })
    }

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