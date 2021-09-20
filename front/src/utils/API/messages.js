import {axios} from '../../Core';


export default {
    getAllByDialogId: (dialogId) => axios.get("/messages?dialog=" + dialogId).then(response =>  response.data ),
    sendMessage: (text, dialog_id, attachments) => axios.post("/messages", {text, dialog_id, attachments}),
    deleteMessage: (messageId) => axios.delete(`/messages?id=${messageId}`)
        .then(({data}) => data)

}

