import React from 'react';
import '../Pages/Home/Chat.scss';
import ContainerDialogs from "../Containers/ContainerDialogs";
import {TeamOutlined,FormOutlined} from '@ant-design/icons';
import { Modal, Button, Select, Input, Form} from 'antd'

const { TextArea } = Input;
const {Option} = Select;

const SideBar = ({
   isModalVisible,
   isSearching,
   message,
   users,
   inputValue,
   handleOk,
   handleCancel,
   showModal,
   handleChangeValue,
   onSearch,
   setMessage
}) => {

    return(

        <div className='chat__sidebar'>
            <div className='chat__sidebar-header'>
                <div >
                    <TeamOutlined/>
                    <span>Список диалогов</span>
                </div>
                <FormOutlined onClick = {showModal} />
            </div>
            <div className='chat__sidebar-dialogs'>
                <ContainerDialogs />
            </div>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={isSearching}
                okButtonProps={{ disabled: message ? false : true }}
                okText='Создать'
                cancelText='Отменить'
                title="Basic Modal"
            >
                <Form>
                    <Form.Item label='Выберите пользователя' className='chat__sidebar-modalItem'>
                        <Select
                            showSearch
                            style = {{width: '100%'}}
                            placeholder = 'найти пользователя'
                            value = {inputValue}
                            onChange = {handleChangeValue}
                            onSearch = {onSearch}
                            notFoundContent={null}
                            defaultActiveFirstOption={false}
                            filterOption={false}
                            showArrow={false}

                        >
                            {  users.map( user => (
                                <Option key = {user._id} >{user.fullname}</Option>
                            ))}
                        </Select>


                   </Form.Item>
                    {inputValue &&
                        <Form.Item label='Введите текс сообщения'  className='chat__sidebar-modalItem'>
                            <TextArea
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                onChange = {(e) => setMessage(e.target.value)}
                                value = {message}
                            />
                    </Form.Item>}
                </Form>
            </Modal>
        </div>
    )
}

export default SideBar;

SideBar.defaultProps = {
    users: []
}