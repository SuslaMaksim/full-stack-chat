import express from 'express';
import {MessageModel,DialogModel} from '../schemas';


class MessageController {
    io: any;

    constructor(io: any) {
        this.io = io;
    }



    show = (req: express.Request, res: express.Response) => {
        const dialogId = req.query.dialog;
        const userId = req.user?._id;

        MessageModel.updateMany(
            { dialog: dialogId, user: { $ne: userId } },
            { $set: { read: true } })
            .then((err: any) => {
                console.log(err)
            })


        MessageModel.find({dialog: dialogId})
            .populate(["dialog", 'user', 'attachments'])
            .exec((err: any, messages: any) => {
                if (err) {
                    return res.status(404).json({
                        message: "Messages not found"
                    })
                }
                res.json(messages)
            })
    }
    create = (req: express.Request, res: express.Response) => {
        let userId = req.user?._id;
        let postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: userId,
            attachments: req.body.attachments
        };
        const message = new MessageModel(postData);
        message
            .save()
            .then((obj: any) => {
                obj.populate(["dialog", 'user', 'attachments'], (err: any, message: any) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    }
                    DialogModel.findOneAndUpdate(
                        {_id: postData.dialog},
                        {lastMessage: message._id},
                        {upsert: true},
                        (err: any) => {
                            if (err) {
                                return res.status(500).json({
                                    status: 'error',
                                    message: err
                                })
                            }
                        }
                    )
                    res.json(message)
                    this.io.emit('SERVER:NEW_MESSAGE', message)
                })
            }).catch(reason => {
            res.json(reason)
        })
    }
    delete = (req: express.Request, res: express.Response) => {
        const messageId: string = req.query.id as string;
        const userId = req.user?._id;

        MessageModel.findById(messageId, (err: any, message: any) => {
            if (err || !message) {
                return res.status(404).json({
                    status: "error",
                    message: "Message not found",
                });
            }

            if (message.user.toString() === userId) {
                const dialogId = message.dialog;
                message
                    .remove()
                    .then(() => {

                        MessageModel.findOne(
                            {dialog: dialogId},
                            {},
                            {sort: {$natural: -1}},
                            (err, lastMessage) => {
                                if (err) {
                                    res.status(500).json({
                                        status: "error",
                                        message: err,
                                    });
                                }
                                DialogModel.findById(dialogId, (err: any, dialog: any) => {
                                    if (err) {
                                        res.status(500).json({
                                            status: "error",
                                            message: err,
                                        });
                                    }
                                    if (!dialog) {
                                        return res.status(404).json({
                                            status: "error",
                                            message: 'Not found',
                                        });
                                    }
                                    console.log(lastMessage)
                                    dialog.lastMessage = lastMessage;
                                    dialog.save();  
                                });
                            });
                        return res.json({
                            status: "success",
                            message: "Message deleted",
                        });
                    })
            }else {
                return res.status(403).json({
                    status: "error",
                    message: "Not have permission",
                });
            }
        })
    }
}

export default MessageController;