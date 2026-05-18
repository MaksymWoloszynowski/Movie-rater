import { Router } from "express";
import movieRouter from "./moviesRouter.js"
import searchRouter from "./searchRouter.js"
import authRouter from "./authRouter.js"
import reviewsRouter from "./reviewsRouter.js"
import usersRouter from "./usersRouter.js"

const router = Router();

router.use("/movies", movieRouter)
router.use("/search", searchRouter)
router.use("/auth", authRouter)
router.use("/movies/:movieId/reviews", reviewsRouter)
router.use('/users', usersRouter)

export default router;