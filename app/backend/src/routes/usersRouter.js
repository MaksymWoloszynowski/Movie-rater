import { Router } from "express";
import usersController from "../controllers/usersController.js"

const router = Router()

router.get('/:username', usersController.getUserProfile)
router.get(`/:username/reviews`, usersController.getUserReviews)

export default router