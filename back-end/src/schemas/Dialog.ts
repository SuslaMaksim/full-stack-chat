import mongoose, {Schema} from 'mongoose';

export interface IDialog extends Document {
    partner: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: string,
    }
}


const DialogSchema = new Schema(

    {
                partner: {type: Schema.Types.ObjectId, ref: "User"},
                author: {type: Schema.Types.ObjectId, ref: "User"},
                lastMessage: {type: Schema.Types.ObjectId, ref: "Message"}
             },
     {
                timestamps: true
              }
    )


const DialogModel  = mongoose.model("Dialog", DialogSchema);

export default  DialogModel;