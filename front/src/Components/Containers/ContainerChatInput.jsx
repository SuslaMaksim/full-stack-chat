import React, {useEffect, useState} from 'react';
import ChatInput from "../ChatInput";
import {connect} from "react-redux";
import {messagesActions} from "../../redux/actions/messages";
import {filesApi} from '../../utils/API'


const ChatInputContainer = ({fetchSendMessage,currentDialogId,dialogs}) => {

    const[value,setValue] = useState('');
    const[emojiPicker,setEmojiPicker] = useState(false);
    const[fileList, setFileList] = useState( []);
    const[isRecording, setRecording] = useState(false)

    let toggleEmoji = () => {
        setEmojiPicker(!emojiPicker)
    }

    const sendMessageOnButton = () => {

        let attachmentsId = fileList.map( item => item.uid);
        fetchSendMessage(value, currentDialogId, attachmentsId);
        setValue('');
        setFileList([]);
    }

    const handleSendMessage = (e) => {
        if(e.key === "Enter") {
            fetchSendMessage(value, currentDialogId, fileList);
            setValue('');
            setFileList([]);
        }
    }

    const handleClick = (el, e) => {
        if(el && !el.contains(e.target)){
            setEmojiPicker(false)
        }
    }

    const addEmoji = (emojiTag) => {
        const {colons} = emojiTag;
        setValue((value + " " + colons).trim());
    }

    const onSelectFiles = async (files) => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading',
                }
            ];
            setFileList(uploaded);

            await filesApi.uploadFiles(file)
                .then( ({data}) => {
                    uploaded = uploaded.map(item => {
                        if (item.uid === uid) {
                            return {
                                status: 'done',
                                uid: data.file._id,
                                name: data.file.filename,
                                url: data.file.url,
                            };
                        }
                        return item;
                    });
                })

            setFileList(uploaded);
        }
    }



    useEffect(() => {

        const el = document.querySelector('.chat-input__smile');
        document.addEventListener('click', handleClick.bind(this, el));
        return () => {
            document.removeEventListener("click", handleClick.bind(this, el));
        }

    }, [])


    return <ChatInput
        emojiPicker = {emojiPicker}
        value = {value}
        fileList = {fileList}
        isRecording = {isRecording}

        setValue = {setValue}
        toggleEmoji = {toggleEmoji}
        handleSendMessage = {handleSendMessage}
        handleClick = {handleClick}
        addEmoji = {addEmoji}
        sendMessageOnButton = {sendMessageOnButton}
        onSelectFiles = {onSelectFiles}
        setRecording = {setRecording}
    />
}

export default connect(
    ({dialogs}) => ({
        dialogs: dialogs.items,
        currentDialogId: dialogs.currentDialogId,
    }),
    messagesActions
)(ChatInputContainer);