import {Router} from 'express';
import { contact, getMyInquiriesLandlord, removeContact, getMyInquiriesTenant, updateInquiryStatus} from '../controllers/inquiry.controller.js';
import {verifyJWT,isLandlord,isTenant} from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/contact").post(verifyJWT, isTenant, contact);
router.route("/myinquiries").get(verifyJWT, isLandlord, getMyInquiriesLandlord);
router.route("/removecontact").delete(verifyJWT, isTenant, removeContact);
router.route("/myinquiries/tenant").get(verifyJWT, isTenant, getMyInquiriesTenant);
router.route("/update-inquiry-status").patch(verifyJWT, isLandlord, updateInquiryStatus);
export default router;