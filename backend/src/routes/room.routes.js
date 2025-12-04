import Router from 'express';
import {verifyJWT,isLandlord} from '../middlewares/auth.middleware.js';
import {addRoom,getAllRooms, getMyRooms,findRoomById} from '../controllers/room.controller.js';

const router=Router();

router.route("/add-room").post(verifyJWT, isLandlord, addRoom);
router.route("/get-all-rooms").get(verifyJWT, getAllRooms);
router.route("/get-my-rooms").get(verifyJWT, getMyRooms);
router.route("/get-room/:id").get(verifyJWT, findRoomById);

export default router;
