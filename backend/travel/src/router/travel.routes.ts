import { Router } from 'express';
import { AddTravels, RemoveTravels, travels} from '../controller/travel.controller'
const router = Router();  







router.get("/travels", travels);  
router.post("/AddTravels", AddTravels);
router.delete("/RemoveTravels", RemoveTravels);



export default router;