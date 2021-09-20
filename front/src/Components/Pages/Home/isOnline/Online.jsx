import React from 'react';
import classNames from 'classnames';

import '../Chat.scss'


const UserOnline  = ({fullname, isOnline}) => (
    <>
        <b className='chat__dialog-header-fullname'>{fullname}</b>
        <div className ='chat__dialog-status-container'>
            <span className={classNames('chat__dialog-header-status',{'active': isOnline })}>
                {isOnline ? 'онлайн' : 'офлайн'}
            </span>

        </div>
    </>
)

export default UserOnline;