import { Router } from 'express';
import {signup, login, removeUser, getusers, admin, findUserFromCart, findUserFromBooked} from '../controller/user.controller'
const router = Router();  



router.post("/signup", signup);
router.post("/login", login);
router.delete("/removeUser", removeUser);
router.get("/getusers", getusers);
router.put("/makeAdmin", admin);
router.get("/getUserFromCart/:travelId", findUserFromCart);
router.get("/getUserFromBooked/:travelId", findUserFromBooked);

export default router;
