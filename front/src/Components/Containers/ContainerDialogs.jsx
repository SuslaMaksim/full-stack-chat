import React,{useState,useEffect} from 'react';
import Dialogs from "../Dialogs/index";
import {dialogActions} from "../../redux/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import socket from '../../Socket/Socket'
import differenceInMinutes from "date-fns/differenceInMinutes";

let {fetchDialogs} = dialogActions;


let ContainerDialogs = ({items,fetchDialogs,match,user}) => {

    const dialogId = match.params.id;
    let[value,onChangeValue] = useState('');
    let[filteredItems, setFilterItems] = useState(Array.from(items));

    let onChangeInput = (value = "") => {
        setFilterItems(items.filter(dialog => dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0))
        onChangeValue(value)
    }

    useEffect(() => {
        if(items.length){
            onChangeInput('')
        }
    }, [items] )

    useEffect( () => {
        fetchDialogs();
        socket.on("SERVER:DIALOG_CREATED",fetchDialogs)
        return ()=> {
            socket.removeListener("SERVER:DIALOG_CREATED",fetchDialogs);
        }
    },[fetchDialogs])


    return(

        <Dialogs
            items={filteredItems}
            onChange={onChangeInput}
            value={value}
            dialogId = {dialogId}
            user = {user}
        />

    )
}

let mapStateToProps = (state) => {

    return {
        items: state.dialogs.items,
        dialogcurrent: state.dialogs.currentDialog,
        user: state.user.data
    }
}

export default withRouter(connect(mapStateToProps,{fetchDialogs})(ContainerDialogs))