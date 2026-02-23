import axios from "axios";
import { useAuthStore } from "../../stores/authStore";

let urlLocal = 'http://localhost:8000' 
let urlTunnel = 'https://buyandoback.share.zrok.io'

const api = axios.create({
    baseURL: urlTunnel,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    console.log()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api