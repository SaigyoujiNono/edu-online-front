import request from "@/utils/request";

export function login(options){
  return request({
    url: '/user/service/login',
    method: 'POST',
    data: {
      ...options
    }
  })
}
