import react,{useEffect,useState} from 'react';
import {Typography,Result,Button} from "antd";
import {Block} from "../../../../Components";
import {userApi} from "../../../../utils/API";

const {Title} = Typography;

const generateErros = (hash, verified) => {
    if(hash){
        if(verified){
            return {
                status: 'success',
                message: 'Аккаунт успешно подтвержден'
            }
        }else{
            return {
                status: 'error',
                message: 'Ошибка при подтверждении аккаунта'
            }
        }
    }else{
        return {
            status: 'success',
            message: 'Ссылка с подтверждением аккаунта отправленна на ваш Е-Mail'
        }
    }
}

const CheckEmailInfo = ({location,history}) => {

    const[verified,setVerify] = useState(false);
    const hash = location.search.split('hash=')[1];
    const info = generateErros(hash, verified)

    useEffect(() => {

        if(hash){
            userApi.verify(hash)
                .then(({data}) => {
                    if(data.status === 'success'){
                        setVerify(true)
                    }
                })
        }
    })
    return(
        <Block>
                <Result
                        status={info.status}
                        title={info.status === 'success' ? 'готово' : 'ошибка'}
                        subTitle={info.message}
                        extra={info.status === 'success' && verified &&
                        <Button type='primary' onClick={() => history.push('/login') }>Войти</Button>}

               />
        </Block>
    )
}

export default CheckEmailInfo;