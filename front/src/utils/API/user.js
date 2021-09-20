import {axios} from '../../Core';


export default {
    login: (postData) => axios.post("/user/login", postData),
    registration: (postData) => axios.post("/user/registration", postData),
    verify: (hash) => axios.get('/user/verify?hash=' + hash),
    getMe: () => axios.get('/user/me'),
    findUsers: (name) => axios.get('/user/find?name='+ name),

}

