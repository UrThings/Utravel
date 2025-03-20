import { Router } from 'express';

const router = Router();  

import {bookedList} from '../controller/booked.controller';
import {getTravelFromBooked} from '../controller/booked.controller';



router.get("/bookedList", bookedList);
router.get("/getTravelFromBooked/:userId", getTravelFromBooked);

export default router;