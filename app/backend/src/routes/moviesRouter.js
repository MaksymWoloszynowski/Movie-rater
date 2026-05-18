import { Router } from "express";
import moviesController from "../controllers/moviesController.js";

const router = Router();

router.get("/", moviesController.getAllMovies);
router.get("/:identifier", moviesController.getMovieByTitle);

export default router;