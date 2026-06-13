import { Router } from "express";
import moviesController from "../controllers/moviesController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateToken, moviesController.getAllMovies);
router.get("/top10", moviesController.getBestReviewedMovies)
router.get("/:identifier", moviesController.getMovieByTitle);

export default router;