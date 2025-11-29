import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile} from '../controllers/accountController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post("/register/", registerUser);
router.post("/login/", loginUser);
router.post("/logout/", logoutUser);
router.get("/:userId", authMiddleware, getUserProfile);
router.put("/:userId", authMiddleware, updateUserProfile);

export default router;
