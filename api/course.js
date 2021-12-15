import request from "@/utils/request";


//获取课程
export function getCourse(params) {
  return request({
    url: '/edu/service/course',
    method: 'get',
    params
  })
}
