import express from 'express';
import {verifyJWTToken} from "../utils";
import {IUser} from "../type";



export default async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    if (req.path === "/user/login" || req.path === '/user/registration' || req.path === '/user/verify') {
        return next()
    }
    const token  = req.headers.token;
    verifyJWTToken(token)
        .then((user: any) => {
            if(user){
                req.user = user.data._doc;
                next()
            }
        })
        .catch(()=>{
            res.status(403).json({message: "Invalid auth token provided"})
        })
};