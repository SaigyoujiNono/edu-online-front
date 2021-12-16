import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

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
