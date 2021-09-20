import React from 'react';
import './Dialogs.scss';
import DialogItem from "../DialogItem";
import sortBy from 'lodash/sortBy';
import {Input,Empty} from "antd";
import {SearchOutlined} from '@ant-design/icons';


let Dialogs = ({items,onChange,value,dialogId,user})=>{

    return(
        <>
            <div className='chat__sidebar-search'>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Поиск среди контактов"
                    onChange={e => onChange(e.target.value)}
                    value={value}
                />
            </div>
            <div className='dialogs'>
                { items.length ?
                    items.map(item =>{
                        return <DialogItem
                            key = {item.lastMessage._id}
                            _id = {item._id}
                            lastMessage={item.lastMessage}
                            dialogId = {dialogId}
                            userData = {user}
                            partner = {item.partner}
                            author = {item.author}
                        />
                    })
                    :
                    <Empty description='Ничего не найденно'/>
                }
            </div>
        </>

    )
}

export default Dialogs;