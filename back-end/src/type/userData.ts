import mongoose from 'mongoose'

export default interface IUser extends mongoose.Document{
    email: string,
    fullname: string,
    password: string,
    confirmed: string,
    avatar: string,
    confirm_hash: string,
    last_seen: Date,

}
