import { NextFunction, Request, Response } from "express";
import {getTravelBooked} from "../service/booked.service"
import {bookedLists} from "../service/booked.service"



export const bookedList = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const bookedList = await bookedLists(req.body)
        return res.status(200).json(bookedList);
    }catch(error){
        res.status(400).json({message: "Cannot fetch bookedList"});
        next(error);
    }
}





export const getTravelFromBooked = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const travels = await getTravelBooked(userId);
        return res.status(200).json(travels);
    } catch (error) {
        res.status(400).json({ message: "Cannot fetch travels" });
        next(error);
    }
};

