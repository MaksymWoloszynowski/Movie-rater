import { Router } from "express";
import usersController from "../controllers/usersController.js"

const router = Router()

router.get('/:username', usersController.getUserProfile)

export default router