import request from "@/utils/request";

// 获取首页的banner
export function getBanner(){
  return request({
    url: '/cms/service/banner/home',
    method: 'get'
  })
}

// 获取首页热门讲师与热门课程
export function getHotCourseAndTeacher(){
  return request({
    url: '/edu/service/home',
    method: 'get'
  })
}
