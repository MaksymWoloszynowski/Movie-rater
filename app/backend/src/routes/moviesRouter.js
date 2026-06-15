import { Router } from "express";
import moviesController from "../controllers/moviesController.js";
import authenticateToken, { authorizeAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", moviesController.getAllMovies);
router.get("/top10", moviesController.getBestReviewedMovies)
router.get("/:identifier", moviesController.getMovieByTitle);
router.post("/", authorizeAdmin, moviesController.addMovie)

export default router;