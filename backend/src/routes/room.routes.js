import Router from 'express';
import {verifyJWT,isLandlord} from '../middlewares/auth.middleware.js';
import {addRoom} from '../controllers/room.controller.js';

const router=Router();

router.route("/add-room").post(verifyJWT, isLandlord, addRoom);

export default router;
