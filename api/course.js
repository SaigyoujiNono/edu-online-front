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
