import { NextFunction, Request, Response } from "express";

import { addTravel, getTravels, removeTravel } from "../service/travel.service";


export const AddTravels = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Received Data:", req.body); // <-- Шалгах
        const { name, Enddate, Startdate, marshrut, price, limit, img } = req.body;

        if (!name || !Enddate || !Startdate || !marshrut || !price || !limit || !img) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await addTravel(name, Enddate, Startdate, marshrut, price, limit, img);
        return res.status(200).json({ message: "Travel added successfully" });

    } catch (error) {
        console.error(error);
        next(error)
        return res.status(500).json({ message: "Cannot Add Travels", error: error.message });
        
    }
};



export const RemoveTravels = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const travels = await removeTravel(req.body.id);
        res.status(200).json({message: "Travels Removed"} );
    }catch(error){
        res.status(400).json({message: "Cannot Remove Travels"});
        next(error)
    }
}



export const travels = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const travels = await getTravels();
        res.status(200).json({travels});
    }catch(error){
        res.status(400).json({message: "Cannot fetch travels"});
        next(error)
    }
}

