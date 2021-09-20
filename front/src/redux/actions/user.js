import { userApi } from '../../utils/API';
import openNotification from "../../Components/Helper/openNotification";

const userActions = {
    setAuth: (bool) => ({type: 'USER:SET_IS_AUTH', payload: bool}),
    fetchUserData: (data) => async (dispatch) => {
        try{
            const {data} = await userApi.getMe();
            dispatch(userActions.setUser(data));
        }catch({response}){
            if(response.status === 403){
                dispatch(userActions.setAuth(false));
                delete window.localStorage.token;
            }
        }
    },
    setUser:  data  => ({type: 'USER:SET_DATA', payload: data}),
    fetchUserLogin: (postData) => async ( dispatch ) => {
        try{
            let {data} = await userApi.login(postData);
            const{status, token} = data;
            if(status === 'error'){
                openNotification({
                    title: 'Ошибка авторизации',
                    text:"Неверный логин или пароль",
                    type: "error"
                })
            } else {
                openNotification({
                    title: 'Отлично',
                    type: "success",
                    text: 'Авторизация успешна!'
                })
                window.axios.defaults.headers.common['token'] = token;
                window.localStorage['token'] = token;
                dispatch(userActions.fetchUserData(data));
                dispatch(userActions.setAuth(true));

            }
            return data;
        } catch ({response}) {
            if(response.status === 403){
                openNotification({
                    title: 'Ошибка авторизации',
                    type: "error",
                    text: 'Данный Пользователь не найден!'
                })
            }
        }


    },
    fetchUserRegistration: (postData) => async dispatch => {
        let {data} = await userApi.registration(postData);
        console.log(data)
    }
}

export default userActions;

