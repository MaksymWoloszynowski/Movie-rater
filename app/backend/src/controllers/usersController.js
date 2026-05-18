import { pool } from "../db.js";

const getUserProfile = async (req, res) => {
    const username = req.user.username;

    try {
        const userInfoResult = await pool.query(
            `SELECT
                u.id AS user_id,
                u.username,
                (SELECT COUNT(*) FROM reviews WHERE user_id = u.id) AS reviews_count
                (SELECT AVG(rating) FROM reviews WHERE user_id = u.id) AS average_review
            FROM users u
            WHERE u.username = $1
                `, [username]
        )
    } catch (error) {
        console.log(error)
         res.status(500).json({ error: "Failed to fetch user profile" });
    }
}

export default {
    getUserProfile
}