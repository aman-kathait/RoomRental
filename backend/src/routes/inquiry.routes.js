import {Router} from 'express';
import { contact, getMyInquiriesLandlord } from '../controllers/inquiry.controller.js';
import {verifyJWT,isLandlord,isTenant} from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/contact").post(verifyJWT, isTenant, contact);
router.route("/myinquiries").get(verifyJWT, isLandlord, getMyInquiriesLandlord);
export default router;