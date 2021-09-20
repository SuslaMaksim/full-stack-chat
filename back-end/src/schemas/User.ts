import mongoose,{Schema} from 'mongoose';
import validator from 'validator';
import {IUser} from "../type";
import {generateUserPassword} from "../validation";
import differenceInMinutes from 'date-fns/differenceInMinutes';


const{isEmail} = validator;

const  UserSchema = new Schema({
    email: {
        type: String,
        required: "Email address is required",
        validate: [isEmail,   "ssss"],
        index: {unique: true}
    },
    avatar: String,
    fullname: {
        type: String,
        required: "Full name is required",

    },
    password: {
        type: String,
        required: "Fassword name is required"
    },
    confirmed:{
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date()

    }
},{
    timestamps: true,
});
UserSchema.virtual('isOnline').get(function(this: any) {

    return differenceInMinutes(new Date(new Date().toISOString()), this.last_seen) < 5 ;
})

UserSchema.set('toJSON', {
    virtuals: true
})

UserSchema.pre<IUser> ("save", function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    generateUserPassword(user.password)
        .then( (hash) => {
            user.password = String(hash);
            generateUserPassword(+new Date()+'').then(hash => {
                user.confirm_hash = String(hash);
                next()
            })
        })
        .catch((err) => {
            next(err)
        })

});

const UserModel = mongoose.model<IUser>("User", UserSchema)

export default UserModel;