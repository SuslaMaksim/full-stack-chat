import React from 'react';
import {connect} from 'react-redux';
import UserOnline from "./Online";
import differenceInMinutes from 'date-fns/differenceInMinutes';

const IsOnlineContainer = ({dialogs, currentDialogId, user}) => {

    if( !dialogs.length || !currentDialogId){
        return null
    }
    const currentDialog = dialogs.filter( dialog => dialog._id === currentDialogId)[0];
    let partner = {};

    if( currentDialog.author._id === user._id){
        partner = currentDialog.partner;
    } else {
        partner = currentDialog.author;
    }
    let isOnline = differenceInMinutes(new Date(new Date().toISOString()), new Date(partner.last_seen)) < 5

    return (
        <UserOnline isOnline={isOnline} fullname={partner.fullname}/>
    )
}

export default connect(({dialogs,user}) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    user: user.data

    })

)(IsOnlineContainer)


