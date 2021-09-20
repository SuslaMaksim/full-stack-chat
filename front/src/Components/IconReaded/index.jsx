import React from 'react'
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import classnames from "classnames";

let IconReaded = ({isMe,isRead,isSimple})=>{


    return(
        <>
        {<div className={classnames('message__icon',{'message__icon--simple': isSimple})}>
            {isRead ? <DoneAllIcon style={{color: '#3674ff'}}/> : <DoneIcon style={{color: '#3674ff'}}/>}
        </div> }
        </>
    )

}

export default IconReaded;
