import request from "@/utils/request";


//获取课程
export function getCourse(params) {
  return request({
    url: '/edu/service/course',
    method: 'get',
    params
  })
}

//获取课程描述
export function getCourseDesc(params) {
  return request({
    url: '/edu/service/coursedesc',
    method: 'get',
    params
  })
}

//获取课程信息与描述与课程老师信息
export function getCourseInfo(params){
  return request({
    url: '/edu/service/course/'+params,
    method:'get'
  })
}

export function getCurrentVideoPlayAuth(params){
  return request({
    url: '/vod/video/'+params,
    method:'get'
  })
}
