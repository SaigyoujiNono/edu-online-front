import request from "@/utils/request";

export function login(data){
  return request({
    url: '/user/service/login',
    method: 'POST',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/service/register',
    method: 'POST',
    data
  })
}

export function sendValid(params) {
  return request({
    url: '/email/service/valid/'+params,
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/service/info',
    method: 'get',
    params:{
      token
    }
  })
}
