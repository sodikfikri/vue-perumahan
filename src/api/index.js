import axios from "axios";

const Api = axios.create({
    //set default endpoint API
    baseURL: 'http://localhost:8100'
})

export default Api