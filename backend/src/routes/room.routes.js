import Router from 'express';
import {verifyJWT,isLandlord,isTenant } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import {addRoom,getAllRooms, getMyRooms,findRoomById,editRoomDetails,deleteRoomById,updateRoomStatus,getRoomsBySearch} from '../controllers/room.controller.js';

const router=Router();

router.route("/add-room").post(verifyJWT, isLandlord, upload.array("images", 3), addRoom);
router.route("/get-all-rooms").get(verifyJWT, getAllRooms);
router.route("/search-rooms").get(verifyJWT, getRoomsBySearch);
router.route("/get-my-rooms").get(verifyJWT,isLandlord, getMyRooms);
router.route("/get-room/:id").get(verifyJWT, findRoomById);
router.route("/edit-room/:id").put(verifyJWT, isLandlord, editRoomDetails);
router.route("/delete-room/:id").delete(verifyJWT, isLandlord, deleteRoomById);
router.route("/update-room-status/:id").put(verifyJWT, isLandlord, updateRoomStatus);

export default router;
