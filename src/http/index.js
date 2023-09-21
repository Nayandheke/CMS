import axios from "axios"
import { toast } from "react-toastify"
import { fromStorage } from "../lib"

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

http.interceptors.request.use(config => {
    const token = fromStorage('130cmstoken')

    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}, err => Promise.reject(err))

http.interceptors.response.use(resp => {
    if('success' in resp.data){
        toast.success(resp.data.success)       
    }
    return resp
}, err => {
    if ('response' in err && 'error' in err.response.data) {
        if(typeof err.response.data.error == 'string'){
            toast.error(err.response.data.error)       
        }
        else{
            for(let k in err.response.data.error){
                toast.error(err.response.data.error[k])
            }
        }
    }
    return Promise.reject(err)
})

export default http