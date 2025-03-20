import { NextFunction, Request, Response } from "express";

import { addToCarts, removeAllFromCarts, removeFromCarts, pays, cartLists, getTravelCarts } from "../service/card.service";


export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { userId, travelId, count , img, name, price } = req.body;

        // Шаардлагатай бүх утга ирсэн эсэхийг шалгах
        if (!userId || !travelId || !count || !img) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const cart = await addToCarts(userId, travelId, count, img, name, price);
        res.status(200).json({ message: "Added to cart successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot add to cart" });
        next(error)
    }
};



export const removeFromCart = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const { userId, travelId } = req.body;
        const cart = await removeFromCarts(userId, travelId);
        res.status(200).json({message: "Removed from cart"});
        console.log(cart);
    }catch(error){
        res.status(400).json({message: "Cannot deleted To Cart"});
        next(error)
    
    }
}


export const pay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, travelId , img , name } = req.body;
        
        // Хэрэв userId байхгүй бол 400 буцаана
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const payed = await pays(userId, travelId ,name, img);
        
        res.status(200).json({ message: "Payment successful", payed });
    } catch (error: any) {
        console.error("Payment Error:", error);
        res.status(500).json({ message: "Tulult amjiltgvi", error: error.message });
        next(error)
    }
};






export const cartList = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cartList = await cartLists()
        return res.status(200).json(cartList);
    }catch(error){
        res.status(400).json({message: "Cannot fetch cartList"});
        next(error)
    }
}








export const getTravelFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;  // URL-аас хэрэглэгчийн ID авах
        const travels = await getTravelCarts(userId);  // getTravelCart функцээс зөвхөн тухайн хэрэглэгчийн аялал авах
        return res.status(200).json(travels);  // Хариуд аялыг буцаах
    } catch (error) {
        console.error("Error fetching travels:", error);  // Алдааг логи
        res.status(400).json({ message: "Cannot fetch travels" });  // Алдаа гарсан тохиолдолд мессеж буцаах
        next(error)
    }
};


export const removeAllFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const cart = await removeAllFromCarts(userId);
        res.status(200).json({ message: "Removed all from cart" });
    } catch (error) {
        res.status(400).json({ message: "Cannot deleted To Cart" });
        next(error)
    }
}



