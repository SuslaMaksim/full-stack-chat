import {axios} from '../../Core';


export default {
    getAll: () => axios.get("/dialogs").then(response =>  response.data ),
    create: ({partner, text}) => axios.post("/dialogs", {partner, text})

}

