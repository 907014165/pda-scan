import axios from 'axios'
import store from '../store/index.js'


const NODE_ENV = process.env.NODE_ENV;

// if(NODE_ENV==='development'){
//     axios.defaults.baseURL = '/api'
// }else{
//     axios.defaults.baseURL = 'http://47.114.126.132:9983'
// }

const ACC_CODE = '00000'

const filterResult = ({data:result} = {}) => {
    const {code,data,message} = result;
    return new Promise((reslove,reject)=>{
        if(code === ACC_CODE){
            reslove(data)
        }else{
            reject(message)
        }
    })
}
const send = ({
    method='',
    url='',
    params={},
    data={},
    headers= {},
    query={},
} = {}) => {
	console.log(data)
    if(store.state.token){
        headers = {
            Authorization:`Bearer ${store.state.token}`
        }
    }
    return new Promise((resolve,reject)=>{
        /* uni.request({
            method,
            url,
            params,
            data,
            headers,
        }).then((res) => filterResult(res)).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        }) */
        uni.request({
            method,
            url,
            params,
            data,
            header:headers,
            query,
        }).then(([_,res]) => filterResult(res)).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}
export default send;