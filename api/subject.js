import request from "@/utils/request";

//获取主分类
export function getPrimarySubject() {
  return request({
    url: '/edu/service/subject',
    method: 'get',
    params:{
      parentId: 0
    }
  })
}
export function getSecondSubject(parentId){
  return request({
    url: '/edu/service/subject',
    method: 'get',
    params:{
      parentId
    }
  })
}
