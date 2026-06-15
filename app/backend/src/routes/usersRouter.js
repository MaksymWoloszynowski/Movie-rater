import { Router } from "express";
import usersController from "../controllers/usersController.js";
import authenticateToken, { authorizeAdmin } from "../middleware/auth.js";

const router = Router();

router.get('/:username', usersController.getUserProfile);
router.get(`/:username/reviews`, usersController.getUserReviews);
router.get('/users/me', usersController.getCurrentUserStatus)
router.patch('/:username/ban', authorizeAdmin, usersController.banUser);
router.patch('/:username/unban', authorizeAdmin, usersController.unbanUser);

export default router