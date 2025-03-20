import { Router } from 'express';
import {signup, login, removeUser, getusers, admin} from '../controller/user.controller'
const router = Router();  



router.post("/signup", signup);
router.post("/login", login);
router.delete("/removeUser", removeUser);
router.get("/getusers", getusers);
router.put("/makeAdmin", admin);

export default router;
