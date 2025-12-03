import {Router} from 'express';
import { registerUser,loginUser,logoutUser, verifyEmail, refreshAccessToken, changePassword, getCurretUser, resendEmailVerification, forgotPassword, verifyForgotPasswordOtp, resetPassword } from '../controllers/auth.controller.js';
import { userRegisterValidator,userLoginValidator, userChangeCurrentPasswordValidator, resetPasswordValidator } from '../validators/authValidator.js';
import {validate} from "../middlewares/validator.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js';
const router=Router();


router.route('/register').post(userRegisterValidator, validate, registerUser);
router.route('/login').post(userLoginValidator, validate, loginUser);
router.route("/verify-email/:token").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-otp").post(verifyForgotPasswordOtp);
router.route("/reset-password").post(resetPasswordValidator,validate,resetPassword);

//secured route
router.route('/logout').post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT,getCurretUser);
router.route("/change-password").post(verifyJWT,userChangeCurrentPasswordValidator, validate,changePassword);
router.route("/resend-verification-email").post(verifyJWT, resendEmailVerification);
export default router;