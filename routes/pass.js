import express from 'express';
import { resetPassEmail, resetPassVerify} from '../controllers/passwordController.js';


const router = express.Router();

router.post("/reset-pass-email",resetPassEmail);
router.post("/reset-password-done/:resetToken",resetPassVerify);


export default router;