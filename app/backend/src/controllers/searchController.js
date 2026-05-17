import { pool } from "../db.js";

const search = async (req, res) => {
  const query = req.query.q?.trim();

  if (!query || query.length < 2) {
    return res.status(200).json({ movies: [] });
  }

  try {
    const result = await pool.query(
      `SELECT * 
       FROM movies 
       WHERE title ILIKE '%' || $1 || '%'`, [query]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
};

export default {
  search
}