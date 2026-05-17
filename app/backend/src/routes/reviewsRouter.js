import express from "express";
import reviewsController from "../controllers/reviewsController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/:title", reviewsController.getAllMovieReviews);
router.post("/:title", authenticateToken, reviewsController.postReview);

export default router;