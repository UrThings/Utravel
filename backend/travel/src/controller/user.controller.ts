import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import * as dotenv from 'dotenv';
import { encrypt } from '../utils/encryption';
import { decrypt } from "../utils/encryption";



dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

import {logins, signups, getUser, makeAdmin, removeUsers, checkUser, usersWithTravelInCart, usersWithBookedTravel} from '../service/user.service'

export const signup = async (req: Request, res: Response, next: NextFunction)  => {
    
    if (!SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined");
    }



    try {
        const { phone, password } = req.body;
        const encryptedPassword = await encrypt(password);


        if (!phone || !password) {
            return res.status(400).json({ message: "Phone and password are required" });
        }

        const user = await checkUser(phone);

        if(user){
            return ("ene dugaartai account baina")
        }

        const newUser = await signups(phone, encryptedPassword);

        if (!newUser) {
            return "Signup failed";
        }
    
        const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: "1h" });
    


        return res.status(200).json({ data: token});
    } catch (error) {
        console.error(error);
        next(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const { phone, password } = req.body;

        // Шаардлагатай утгууд ирсэн эсэхийг шалгах
        if (!phone || !password) {
            return res.status(400).json({ message: "Phone and password are required" });
        }

        const user = await logins(phone, password);

        if(!user){
            return("dugaar buruu baina")
        }

        const decryptedPassword = await decrypt(user.password); 



        if (password !== decryptedPassword) {
            return "password buruu baina";
        }
          
        
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });


        return res.status(200).json({ token, user });

    } catch (error) {
        console.error(error);
        next(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const findUserFromCart = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const {travelId} = req.params;
        const user = await usersWithTravelInCart(travelId) 
        res.json({data: user})
    }
    catch(error)
    {
        res.status(500).json({message: 'findUserFromCart error'})
    }
}





export const findUserFromBooked = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const {travelId} = req.params;
        const user = await usersWithBookedTravel(travelId) 
        res.json({data: user})
    }
    catch(error)
    {
        res.status(500).json({message: 'findUserFromCart error'})
    }
}








export const getusers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await getUser()
        return res.status(200).json(users);

    }catch(error){
        res.status(400).json({message: "Cannot fetch users"});
        next(error)
    }
}





export const admin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await makeAdmin(userId);
        res.status(200).json({ message: "User is admin now" });
    } catch (error) {
        res.status(400).json({ message: "Cannot make admin" });
        next(error)
    }
}




export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await removeUsers(userId);
        res.status(200).json({ message: "User is removed", data: user });
    } catch (error) {
        res.status(400).json({ message: "Cannot remove user" });
        next(error)
    }
}




