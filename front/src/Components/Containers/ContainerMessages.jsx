import React,{useState,useEffect,useRef} from 'react';
import {Message} from "../index";
import {Empty, Modal, Spin} from 'antd';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';


import {messagesActions} from '../../redux/actions/messages';
import '../Pages/Home/Home.scss'
import socket from "../../Socket/Socket";



let ContainerMessages = ({isLoading,messages,fetchMessages,match,addMessage,userData,deleteMessage}) => {

    let {id} = match.params;
    let messagesRef = useRef(null);
    let[previewImage, setPreviewImage] = useState(null)


    useEffect(() => {
        if(id){
            fetchMessages(id)
        }
        socket.on("SERVER:NEW_MESSAGE", data => {
            addMessage(data)
        })
        return ()=> {
            socket.removeListener('SERVER:NEW_MESSAGE')
        }
    }, [addMessage,fetchMessages,id]);


    useEffect( () => {
        messagesRef.current.scrollTo(0, 99999)
    }, [messages])

    let deleteMessageById = (messageId) => {
       deleteMessage(messageId)
    }
    console.log(messages)

    return(
           <div className='messages' ref={messagesRef}>
                {isLoading
                    ?
                    <div className='messages__spin'>
                        <Spin  size='large' tip='Загрузка сообщений ...'/>
                    </div>

                    :
                    ( messages ? ( messages.length > 0 ? (messages.map(item => <Message
                                user = {item.user}
                                avatar={item.avatar}
                                isMe={userData._id === item.user._id}
                                text={item.text}
                                date={item.date}
                                key={item._id}
                                attachments={item.attachments}
                                isRead={item.read}
                                deleteMessage = {deleteMessageById.bind(this, item._id)}

                                setPreviewImage = {setPreviewImage}


                            />
                            ))
                            :
                            <div className='chat__dialog--empty'><Empty description='Диалог Пуст'/></div>

                         )
                        :
                            <div className='chat__dialog--empty'><Empty description='Откройте Диалог'/></div>

                    )

                }
               <Modal
                   title="Img"
                   visible={!!previewImage}
                   onCancel={() => setPreviewImage(null)}
                   footer = {null}
               >
                   <img src={previewImage} style={{width: '100%'}} alt="modalImg"/>
               </Modal>
            </div>
    )
}

let mapStateToProps = state => ({
    messages: state.messages.messages,
    currentDialogId: state.dialogs.currentDialog,
    isLoading: state.messages.isLoading,
    userData: state.user.data

})

export default compose(
    connect(mapStateToProps, messagesActions),
    withRouter,
)(ContainerMessages)

