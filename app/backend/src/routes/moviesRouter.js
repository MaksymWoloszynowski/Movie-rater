import { Router } from "express";
import moviesController from "../controllers/moviesController.js";

const router = Router();

router.get("/", moviesController.getAllMovies);
router.get("/top10", moviesController.getBestReviewedMovies)
router.get("/:identifier", moviesController.getMovieByTitle);

export default router;