import { pool } from "../db.js";
import { getOrSetCache } from "../utils/getOrSetCache.js";

const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM movies`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

const getBestReviewedMovies = async (req, res) => {
  try {
    const { value, hit } = await getOrSetCache("top10", 10, async () => {
      const result = await pool.query(`
        SELECT * 
        FROM movies m 
        LEFT JOIN reviews r ON r.movie_id = m.id
        GROUP BY m.id, r.user_id, r.movie_id 
        ORDER BY ROUND(AVG(r.rating), 1) 
        LIMIT 10`);
      return result.rows;
    });

    res.set("X-Cache", hit ? "HIT" : "MISS");

    res.json(value);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}

const getMovieByTitle = async (req, res) => {
  const { identifier } = req.params;

  try {
    const result = await pool.query(
      `SELECT m.id,
          m.title,
          m.original_language,
          m.overview,
          m.poster_path,
          m.release_date,
          COALESCE(ROUND(AVG(r.rating), 1), 0) AS average_rating,
          COUNT(r.movie_id) AS reviews_count 
        FROM movies m 
        LEFT JOIN reviews r ON r.movie_id = m.id 
        WHERE slug = $1
               OR LOWER(slug) = LOWER($1)
               OR LOWER(title) = LOWER(REPLACE($1, '-', ' '))
               OR LOWER(title) LIKE LOWER('%' || REPLACE($1, '-', ' ') || '%')
        GROUP BY m.id
        LIMIT 1;
        `,
      [identifier],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch a movie" });
  }
};

export default {
  getAllMovies,
  getBestReviewedMovies,
  getMovieByTitle,
};
