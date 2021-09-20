import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from "react-string-replace";
import './Message.scss';
import classnames from 'classnames';
import {IconReaded} from "../index";
import {Emoji} from "emoji-mart";
import MessageAudio from "./MessaageAudio";
import {Avatar} from "../index";
import {Popover,Button,Modal} from "antd";
import {EllipsisOutlined  } from '@ant-design/icons';



const Message = (
    {
        avatar,
        user,
        text,
        isMe,
        isRead,
        attachments,
        date,
        isTyping,
        audio,
        deleteMessage,
        previewImage,
        setPreviewImage
    }

)=>{

    const content = (
        <div>
            <Button onClick = {deleteMessage}> Удалить Соообщение</Button>
        </div>
    )
    return(
        <div className={classnames('message',
            {
                'message--isme': isMe,
                'message--isTyping': isTyping,
                'message--image':attachments && attachments.length === 1,
                'message--audio':audio
            }
            )}>
            <div className="message__content">
                <div className='message__avatar'>
                    <Avatar user={user} id={user.id} small={true} />
                </div>
                <div className='message__info'>
                   {isMe && <IconReaded isRead={isRead} isMe={true} isSimple={false}/>}
                   { (text || isTyping || audio) && <div className='message__bubble'>
                       {isMe &&

                       <Popover className='message__popover'  content={content} trigger="click">
                           <EllipsisOutlined className='message__popover-icon' />
                       </Popover>
                       }
                        {text &&  <p className='message__text'>{reactStringReplace(text,/:(.+?):/g, (match, i) => (
                            <Emoji key ={i} emoji={match} set='apple' size ={16}/>
                        ))}</p>}
                        {isTyping && <div className='message__typing'>
                            <span/>
                            <span/>
                            <span/>
                        </div>}
                       {audio && <MessageAudio audio={audio}/>}
                    </div>}
                    {attachments.length > 0 &&
                        <div className='message__attachments'>
                            {attachments.map(item => <div key = {item._id} className='message__attachments--item'>
                                <img onClick={() => setPreviewImage(item.url)} src={item.url} alt={item.filename}/>
                            </div>)}
                        </div>
                    }
                    {date && <span className='message__data'>{date}</span>}


                </div>
            </div>


        </div>
    )
}

export default Message;

Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    data: PropTypes.string,
    user: PropTypes.object
}