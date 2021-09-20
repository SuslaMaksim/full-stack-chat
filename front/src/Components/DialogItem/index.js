import React from 'react';
import './DialogItem.scss';
import {IconReaded,Avatar} from '../index';
import classnames from 'classnames';
import {Link} from 'react-router-dom'
import differenceInMinutes from "date-fns/differenceInMinutes";





let DialogItem = ({ lastMessage, _id, dialogId, partner, userData , author})=>{
    let partnerDialog = {};
    if(partner._id === userData._id){
        partnerDialog = author
    } else {
        partnerDialog = partner
    }
    const isOnline = differenceInMinutes(new Date(new Date().toISOString()), new Date(partnerDialog.last_seen)) < 5;
    return(
        <Link to={`/dialog/${_id}`} >
            <div  className={classnames('dialogs__item', {
                'dialogs__item-online': isOnline,
                'dialogs__item-current': _id === dialogId
            })}>
                <div className="dialogs__item-avatar">
                    <Avatar user={partnerDialog} id ={partnerDialog.id}/>
                </div>
                <div className="dialogs__item-info">
                    <div className='dialogs__item-info-top'>
                        <b>{partnerDialog.fullname}</b>
                        <span>{lastMessage.created_at}</span>
                    </div>
                    <div className='dialogs__item-info-bottom'>
                        <p> {lastMessage.text} </p>
                        {lastMessage.isReaded
                            ?
                            <div className='dialogs__item-info-count'>{lastMessage.isReaded > 9 ? '+9' : lastMessage.isReaded}</div>
                            :
                            <IconReaded isRead={false} isSimple = {true}/>
                        }

                    </div>
                </div>

            </div>
        </Link>

    )
}

export default DialogItem;