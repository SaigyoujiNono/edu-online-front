import axios from 'axios'
import cookie from "js-cookie";

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = cookie.get('auth-token')
    if (token && token !== '') {
      config.headers['auth-token'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (response) {
    const res = response.data
    if (res.code !== 20000){
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  function (error) {
    return Promise.reject(error)
    // ...
  }
)

export default service
