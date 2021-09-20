import React from 'react'
import {Block, Button} from "../../../Components";
import {Form, Input} from "antd";
import {Link} from 'react-router-dom'
import { LockOutlined,MailOutlined } from '@ant-design/icons';


let LoginForm = (props)=> {
    const{
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props
    return (
        <div>
            <div className='auth__top'>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form onSubmit = {handleSubmit}>
                    <Form.Item hasFeedback
                               validateStatus={!touched.email ? '' : errors.email ? 'error' : 'success'}
                               help = {!touched.email ? null : errors.email}
                    >

                        <Input size="large" placeholder="E-mail"
                               prefix={<MailOutlined style={{fontSize: '14px', marginRight: '12px', opacity: '.8'}}/>}
                               id = "email"
                               value = {values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item hasFeedback
                               validateStatus={!touched.password ? '' : errors.password ? 'error' : 'success'}
                               help = {!touched.password ? null : errors.password}

                    >
                        <Input size="large"  placeholder="Password"  prefix={<LockOutlined style={{fontSize:'14px',marginRight: '12px',opacity: '.8'}}/>}
                               id = "password"
                               value = {values.password}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               type = 'password'
                               autoComplete='false'
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' disabled={isSubmitting} onClick = {handleSubmit} >войти в аккаунт</Button>
                    </Form.Item>
                    <Form.Item style={{marginBottom: '0px'}} >
                        <Link to='/register' className='auth__regitser--link'>зарегистрироваться </Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>

    );
}

export default LoginForm;
