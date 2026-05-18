import { pool } from "../db.js";

const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM movies`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

const getMovieByTitle = async (req, res) => {
  const { identifier } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM movies WHERE slug = $1
               OR LOWER(slug) = LOWER($1)
               OR LOWER(title) = LOWER(REPLACE($1, '-', ' '))
               OR LOWER(title) LIKE LOWER('%' || REPLACE($1, '-', ' ') || '%')
            LIMIT 1
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
  getMovieByTitle,
};
