import express from "express";
import reviewsController from "../controllers/reviewsController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get("/", reviewsController.getAllMovieReviews);
router.post("/", reviewsController.postReview);

export default router;