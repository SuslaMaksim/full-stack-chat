import mongoose, {Schema} from 'mongoose';


const Message  = new Schema({
    text: {
        type: String,
        require: true
    },
    //attachments:
    read: {
        type: Boolean,
        default: false
    },
    dialog: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Dialog"
    },
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    attachments: [{type: Schema.Types.ObjectId, ref: 'UploadFile'}],
    },
    {
        timestamps: true,
        usePushEach: true
    }
    )


const MessageModel  = mongoose.model( 'Message', Message);

export default MessageModel;