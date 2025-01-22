import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export const userMiddleware = (req: Request, res: Response,
    next: NextFunction) => {
        const header = req.headers.["authorization"];
        const decoded = jwt.verify(header as string, JWT_PASSWORD)

        if(decoded){
            //@ts-ignore
            req.userId = decoded.indexOf;
            next()
        }else {
            req.status(403).json({
                messaage: "You are not logged in"
            })
            

        }
    }