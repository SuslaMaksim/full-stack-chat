import express from "express";
import {DialogModel,MessageModel} from "../schemas";

declare global {
    namespace Express {
        interface User {
            _id: string
        }
    }
}


class DialogController{
    io: any;
    constructor(io: any) {
        this.io = io;
    }
        show(req: express.Request, res: express.Response){
            const userId = req.user?._id;
            DialogModel.find()
                .or([{author: userId},{partner: userId}])
                .populate(["author", "partner"])
                .populate({
                    path: "lastMessage",
                    populate: {
                        path: "user"
                    }
                })
                .exec((err: any, dialogs: any) => {
                    if(err){
                        return res.status(404).json({
                            message: "Dialogs not found"
                        })
                    }
                    res.json(dialogs)
                })
        }
        create = (req: express.Request, res: express.Response) => {
            let postData = {
                author: req.user?._id,
                partner: req.body.partner
            };
            const dialog = new DialogModel(postData);
            dialog
                .save()
                .then((dialogObj: any) => {

                    const message = new MessageModel({
                        text: req.body.text,
                        user:  req.user?._id,
                        dialog: dialogObj._id,
                    })
                    message
                        .save()
                        .then(() => {
                            dialogObj.lastMessage = message._id;
                            dialogObj.save().then(() => {
                                res.json(dialogObj)
                                this.io.emit("SERVER:DIALOG_CREATED",{
                                    ...postData,
                                    dialog: dialogObj
                                });
                            })
                        })
                        .catch( reason => {
                        res.json(reason)
                    })
                })
        }
        delete(req: express.Request, res: express.Response){
            const id: String = req.params.id;
            DialogModel.findOneAndRemove({_id: id})
                .then( (dialog: any) => {
                    if(dialog){
                        res.json({
                            message: 'Dialog deleted'
                        })
                    }
                })
                .catch(() => {
                    res.json({
                        message: 'Dialog not found'
                    })
                })
        }

}

export default DialogController;