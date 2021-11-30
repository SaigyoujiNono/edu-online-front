import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost/api',
  timeout: 5000
})

service.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
    // ...
  }
)

export default service
