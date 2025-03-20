import { Router } from 'express';
const router = Router();  

import { addToCart, removeFromCart, pay,  cartList,  getTravelFromCart, removeAllFromCart } from '../controller/card.controller';





router.get("/cartList", cartList);
router.delete("/removeFromCart", removeFromCart);
router.delete("/removeAllFromCart", removeAllFromCart);
router.post("/pay", pay);
router.post("/cart", addToCart);
router.get("/getTravelFromCart/:userId", getTravelFromCart);  

export default router;