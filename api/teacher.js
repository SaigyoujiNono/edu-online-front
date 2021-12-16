import request from "@/utils/request";


//获取教师
export function getTeacher(params) {
  return request({
    url:'/edu/service/teacher',
    method: 'get',
    params
  })
}
