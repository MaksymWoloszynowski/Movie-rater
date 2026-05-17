import { pool } from "../db.js";

const getAllMovies = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM movies`
        )
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}

const getMovieByTitle = async (req, res) => {
    const { title } = req.params.title;

    try {
        const result = await pool.query(
            `SELECT * FROM movies WHERE title = $1`,[title]
        ) 
    } catch (error) {
        
    }
}

export default {
    getAllMovies,
    getMovieByTitle
}