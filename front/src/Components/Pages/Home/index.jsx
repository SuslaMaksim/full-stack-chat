import React from 'react'
import './Home.scss'
import "./Chat.scss";
import {EllipsisOutlined  } from '@ant-design/icons';
import IsOnlineContainer from "./isOnline/IsOnlineContainer";
import {Time} from "../../index";
import ChatInputContainer from "../../Containers/ContainerChatInput";
import ContainerMessages from "../../Containers/ContainerMessages";
import SideBarContainer from "../../Containers/SideBarContainer";
import {withRouter} from 'react-router-dom';
import {Empty} from "antd";


let Index = ({match}) => {

    let {id} = match.params;
    return (
        <section className='home'>

            <div className='chat'>
                <SideBarContainer/>
                    <div className='chat__dialog'>
                        {id === undefined
                           ? <div className='chat__dialog--empty'><Empty description='Откройте Диалог'/></div> : <>
                                <div className='chat__dialog-header'>
                                    <div/>
                                    <div className='chat__dialog-header-center'>
                                        <IsOnlineContainer/>
                                    </div>
                                    <EllipsisOutlined className='chat__dialog-header-icon'/>
                                </div>
                                < div className='chat__dialog--messages'>
                                <ContainerMessages/>
                                </div>
                                <div className='chat__dialog--input'>
                                <ChatInputContainer/>
                                </div>
                            </> }
                    </div>

            </div>


        </section>
    );
}

export default withRouter(Index);
