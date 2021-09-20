import express from 'express';
import {UserModel} from "../schemas";


export default async (req: express.Request, __: express.Response, next: express.NextFunction) => {
   await UserModel.updateOne(
        {_id: req.user?._id},
        {
            last_seen: new Date()
        },
       {new: true},
    );
    next();
};