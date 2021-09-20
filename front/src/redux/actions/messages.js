import { messagesApi } from '../../utils/API';
import dialogActions from "./dialogs";

export let messagesActions = {
    setMessage: (message) => ({type: 'MESSAGES:ADD_MESSAGE', payload: message}),
    setMessages:  messages  => ({type: 'MESSAGES:SET_ITEMS', payload: messages}),
    deleteMessageAction:  (messageId)  => ({type: 'MESSAGES:DELETE_MESSAGE', payload: messageId}),
    setLoading: bool => ({type: 'MESSAGES:SET_LOADING', payload: bool}),
    addMessage: message => (dispatch, getState) => {
        const{dialogs} = getState();
        const{currentDialogId} = dialogs;
        if(currentDialogId === message.dialog._id){
            dispatch(messagesActions.setMessage(message));
            dispatch(dialogActions.fetchDialogs())
        }
    },

    fetchMessages: (dialogId) => async ( dispatch ) => {
        dispatch(messagesActions.setLoading(true))
        let messages = await messagesApi.getAllByDialogId(dialogId);
        dispatch(messagesActions.setMessages(messages))
        dispatch(dialogActions.setCurrentDialogId(dialogId))
    },
    fetchSendMessage: (text, dialog_id, attachments) => (dispatch) => {
        messagesApi.sendMessage(text, dialog_id, attachments)
    },
    deleteMessage: (messageId) => async (dispatch) => {
       let data = await messagesApi.deleteMessage(messageId);
       console.log(data)
       if(data.status === 'success'){
           dispatch(messagesActions.deleteMessageAction(messageId));
       }
    }
}




