import React from 'react';
import reactStringReplace from "react-string-replace";
import "./ChatInput.scss";
import PicturesWall from "../UploadFiles/PicturesWall";
import { Input,Button } from 'antd';
import { UploadField } from '@navjobs/upload';
import {Emoji, Picker} from 'emoji-mart';
import {
    CameraOutlined,
    SmileOutlined,
    AudioOutlined,
    SendOutlined,
    CloseOutlined

} from '@ant-design/icons';


const { TextArea } = Input;

let ChatInput = ({
     value,
     fileList,
     isRecording,
     setValue,
     emojiPicker,
     toggleEmoji,
     addEmoji,
     handleSendMessage,
     sendMessageOnButton,
     onSelectFiles,
     setRecording
}) => {

    return(
        <>
                <div className='chat-input'>
                    <div className='chat-input__pictureswall'>
                        <PicturesWall fileListArrey={fileList}/>
                    </div>
                    <div className='chat-input__smile'>
                        <SmileOutlined key={1} onClick = {toggleEmoji} className='chat-input__icons'/>

                        <div  className='chat-input__emoji-picker'>
                            {emojiPicker && <Picker
                                onSelect = { emojiTag => addEmoji(emojiTag)}
                                set='apple'
                            />}
                        </div>
                    </div>
                    { !isRecording ?
                        <>
                            <TextArea
                                onKeyUp={handleSendMessage}
                                onChange={ (e) => setValue(e.target.value)}
                                value = {value}
                                placeholder='Введите текст сообщени'
                                size='large'
                                autoSize={{ minRows: 2, maxRows: 2 }}
                            />
                            <UploadField
                                onFiles={files => onSelectFiles(files)}
                                containerProps={{
                                    className: 'chat-input__upload'
                                }}
                                uploadProps={{
                                    accept: '.jpg, .jpeg, .png, .gif',
                                    multiple: 'multiple'

                                }}
                            >
                                <CameraOutlined className='chat-input__upload-icons' />
                            </UploadField>
                            <AudioOutlined onClick = {() => setRecording(true)} className='chat-input__icons' />
                        </>
                        :
                        <div className='chat-input__isrecording'>
                            <span className='chat-input__isrecording-span' > Идет запись ...</span>
                            <Button
                                className='chat-input__buttonClose'
                                size='small'
                                danger type = 'primary'
                                shape='circle'
                                icon={<CloseOutlined/>}

                                onClick={() => setRecording(false)}
                            />
                        </div>
                    }

                    <SendOutlined className='chat-input__icons' onClick = {sendMessageOnButton} />
                </div>
        </>
    )

}

export default ChatInput;
