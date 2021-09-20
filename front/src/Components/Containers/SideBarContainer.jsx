import React, {useState} from 'react';
import '../Pages/Home/Chat.scss';
import SideBar from "../SideBar";
import {connect} from "react-redux";
import {userApi,dialogsApi} from "../../utils/API";

const SideBarContainer = (props) => {

    const[isModalVisible, setIsModalVisible] = useState(false);
    const[dialogId, setDialogId] = useState('');
    const[users, setUsers] = useState([]);
    const[isSearching, setIsSearching] = useState(false);
    const[message, setMessage] = useState('');


    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsSearching(true)
        dialogsApi.create({
            text: message,
            partner: dialogId
        }).then(() => {
            setIsSearching(false);
            setIsModalVisible(false);
            setDialogId('');
            setMessage('');
            }).catch(() => setIsSearching(false))
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setDialogId('')
    };
    const handleChangeValue = (value) => {
        setDialogId(value)

    }
    const onSearch = (value) => {
        setIsSearching(true)
        userApi.findUsers(value)
            .then(({data}) => {
                setUsers(data);
                setIsSearching(false)
            }).catch(() => {
                setIsSearching(false)
        })
    }

    return(
        <SideBar
            users = {users}
            isModalVisible = {isModalVisible}
            inputValue = {dialogId}
            isSearching = {isSearching}
            message = {message}

            setMessage = {setMessage}
            onSearch={onSearch}
            handleChangeValue = {handleChangeValue}
            handleCancel = {handleCancel}
            handleOk={handleOk}
            showModal={showModal}
             />
    )
}

export default connect()(SideBarContainer);