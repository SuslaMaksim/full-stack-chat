import React from 'react'
import {Block, Button} from "../../../Components";
import {Form, Input} from "antd";
import { UserOutlined,LockOutlined,InfoCircleOutlined,MailOutlined } from '@ant-design/icons';
import  FormField from '../../../Components/FormField/index'



let RegistrationForm = (props)=> {
    const{
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props
    let success = false;
    return (
        <div>
            <div className='auth__top'>
                <h2>Регистраци</h2>
                <p>Для входа в чат вам нужно зарегестрироваться</p>
            </div>
            {!success ?
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
                                   validateStatus={!touched.fullname ? '' : errors.fullname ? 'error' : 'success'}
                                   help = {!touched.fullname ? null : errors.fullname}
                        >

                            <Input size="large" placeholder="Ваше имя"

                                   prefix={<UserOutlined style={{fontSize: '14px', marginRight: '12px', opacity: '.8'}}/>}
                                   id = "fullname"
                                   value = {values.fullname}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item hasFeedback
                                   validateStatus={!touched.password ? '' : errors.password ? 'error' : 'success'}
                                   help = {!touched.password ? null : errors.password}
                        >
                            <Input size="large" placeholder="Пароль"
                                   prefix={<LockOutlined style={{fontSize: '14px', marginRight: '12px', opacity: '.8'}}/>}
                                   id = "password"
                                   value = {values.password}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   type='password'
                                   autoComplete="off"
                            />


                        </Form.Item>
                        <Form.Item hasFeedback
                                   validateStatus={!touched.password_2 ? '' : errors.password_2 ? 'error' : 'success'}
                                   help = {!touched.password_2 ? null : errors.password_2}
                        >
                            <Input size="large" placeholder="Повторите пароль"
                                   prefix={<LockOutlined style={{fontSize: '14px', marginRight: '12px', opacity: '.8'}}/>}
                                   id = "password_2"
                                   value = {values.password_2}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   type='password'
                                   autoComplete="off"

                            />
                        </Form.Item>
                        <Form.Item style={{marginBottom: '0px'}}>
                            <Button onClick = {handleSubmit}  type='primary'>ЗарегестрироватьсчЯ</Button>
                        </Form.Item>
                    </Form>
                </Block>
                :
                <Block>
                    <div className='auth__confirm'>
                        <InfoCircleOutlined/>
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>На вашу почту отправлено письмо с сылкой на подтверждение аккаунта</p>
                    </div>
                </Block>
            }
        </div>

    );
}

export default RegistrationForm;
