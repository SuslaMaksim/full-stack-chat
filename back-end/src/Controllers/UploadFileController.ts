import express from "express";
import {UploadFileModel} from "../schemas";




class UploadFileController{

    create = (req: express.Request, res: express.Response) => {
        const file : any = req.file;
        const userId = req.user?._id;

        const fileData = {
            filename: file.originalname,
            size: file.size,
            ext: file.mimetype,
            url: file.path,
            user: userId
        }

        const uploadedFile = new UploadFileModel(fileData);

        uploadedFile
            .save()
            .then( (fileObj: any) => {
                res.json({
                    status: 'success',
                    file: fileObj
                })
            })
            .catch( (err: any) => {
                    res.json({
                        status: 'error',
                        message: err
                    })
            })



    }

    delete = (req: express.Request, res: express.Response) => {
        console.log('sss')
    }


}

export default UploadFileController;