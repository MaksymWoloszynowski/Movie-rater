import { Router } from "express";
import movieRouter from "./moviesRouter.js"
import searchRouter from "./searchRouter.js"
import reviewsRouter from "./reviewsRouter.js"
import usersRouter from "./usersRouter.js"
import healthRouter from "./healthRouter.js";

const router = Router();

router.use("/movies", movieRouter)
router.use("/search", searchRouter)
router.use("/movies/:movieId/reviews", reviewsRouter)
router.use('/users', usersRouter)
router.use("/health", healthRouter)

export default router;