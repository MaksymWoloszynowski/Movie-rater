import { Router } from "express";
import movieRouter from "./moviesRouter.js"
import searchRouter from "./searchRouter.js"
import reviewsRouter from "./reviewsRouter.js"
import usersRouter from "./usersRouter.js"
import usersController from "../controllers/usersController.js";
import healthRouter from "./healthRouter.js";
import authenticateToken, { rejectBanned } from "../middleware/auth.js";

const router = Router();

router.use("/movies", authenticateToken, rejectBanned, movieRouter)
router.use("/search", authenticateToken, rejectBanned, searchRouter)
router.use("/movies/:movieId/reviews", authenticateToken, rejectBanned, reviewsRouter)
router.use('/users', authenticateToken, rejectBanned, usersRouter)
router.use("/health", healthRouter)

export default router;