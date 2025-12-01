import {Router} from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { userRegisterValidator } from '../validators/authValidator.js';
import {validate} from "../middlewares/validator.middleware.js";

const router=Router();

router.route('/register').post(userRegisterValidator, validate, registerUser);

export default router;