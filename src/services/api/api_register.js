import axios from "axios";

let urlLocal = 'http://localhost:8000' 
let urlTunnel = 'https://buyandoback.share.zrok.io'

const api_register = axios.create({
    baseURL: urlTunnel,
})

export default api_register