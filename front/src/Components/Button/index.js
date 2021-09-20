import React from 'react';
import {Button as BaseButton} from "antd";
import classNames from 'classnames'
import './Button.scss';

let Button = (props)=>{

    return(
        <BaseButton {...props} className = {classNames('button',props.className)} />

    )
}

export default Button