import react from 'react';
import {Form, Input } from "antd";
import  Icon  from '@ant-design/icons';



const FormField = ({name, touched, errors, values, handleChange, handleBlur, icon}) => {

        console.log(icon)
    return(
        <Form.Item hasFeedback
                   validateStatus={!touched.email ? '' : errors.email ? 'error' : 'success'}
                   help = {!touched.email ? null : errors.email}
        >

            <Input size="large" placeholder="E-mail"

                   prefix={<Icon type='smile' style={{fontSize: '14px', marginRight: '12px', opacity: '.8'}}/>}
                   id = "email"
                   value = {values.email}
                   onChange={handleChange}
                   onBlur={handleBlur}
            />
        </Form.Item>
    )

}

export default FormField;