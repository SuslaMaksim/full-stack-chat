import express from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../schemas";
import {createJWToken} from "../utils";
import {validationResult} from 'express-validator';



class UserController{
    io: any;
    constructor(io: any) {
        this.io = io;
    }

    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err : any, user : any) => {
            if(err) {
                return res.status(404).json({
                        message: "Not found"
                    }
                )
            }else {
                res.json(user)
            }
        })
    }
    getMe(req: express.Request, res: express.Response){
        const id: string | undefined = req.user?._id;
        UserModel.findById(id, (err : any, user : any) => {
            if(err) {
                return res.status(404).json({
                        message: "Not found"
                    }
                )
            }else {
                console.log(user.isOnline)
                res.json(user)
            }
        })
    }
    findUsers = (req: express.Request, res: express.Response) => {
        const name: string | undefined = req.query.name as string;
        console.log(name)
        UserModel.find()
            .or([{fullname:  new RegExp( name, 'i')},
                      {email:  new RegExp( name, 'i')}
            ])
            .then( (users: any) => res.json(users))
            .catch((err: any) => {
                return res.status(404).json({
                    status: 'error',
                    message: err
                })
            })

    }

    verify(req: express.Request, res: express.Response){
        const hash: string = req.query.hash as string;
        if(!hash){
            return res.status(422).json({ errors: "Invalid hash" });
        }
        UserModel.findOne({confirm_hash: hash}, (err: any, user: any) => {
            if(err || !user) {
                return res.status(404).json({
                    status: 'error',
                    message: "Hash not found"
                });
            }
            user.confirmed = true;
            user
                .save()
                .then((obj: any) => {
                    res.json({
                        status: 'success',
                        message: 'Аккаунт успешно подтвержден'
                    })
                })
                .catch((error: any) => res.json({
                    status: "error",
                    message: error
                }))
        })
    }
    create(req: express.Request, res: express.Response) {

        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password
        };

        console.log(postData);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user  = new UserModel(postData);
        user
            .save()
            .then((obj: any) => {
                res.json(obj)
            })
            .catch((error: any) => res.json({
                status: "error",
                message: error
            }))
    }
    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({_id: id})
            .then((user: any) => {
                if(user){
                    res.json({
                        message: `User ${user.fullname} was delete `
                    })
                }
        }).catch(() => {
            res.json({
                message: "User not Found"
            })
        })
    }
    login(req: express.Request, res: express.Response){
        const postData = {
            email: req.body.email,
            password: req.body.password
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else {
            UserModel.findOne({email: postData.email},(err:any, user:any) => {
                if(err || !user) {
                    return res.status(403).json({
                        message: "User not found"
                    });
                }
                if(bcrypt.compareSync(postData.password, user.password)) {
                    const token = createJWToken(user);
                    res.json({
                        status: 'success',
                        token
                    })
                } else {
                    res.json({
                        status: "error",
                        message: "Incorrect password or email"
                    })
                }
            })
        }
    }


}

export default UserController;