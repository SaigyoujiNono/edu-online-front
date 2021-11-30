<template>
  <div class="content-container">
    <Sliders :slidersImgs="bannerList" />
    <HotCourse :hotCourse="hotCourseList" />
    <HotTeacher :hotTeacher="hotTeacherList"/>
  </div>
</template>

<script>
import {getBanner, getHotCourseAndTeacher} from "@/api/index";

export default {
  data() {
    return {}
  },
  async asyncData({app}) {
    // 请求首页轮播图
    let bannerList = []
    let bannerRequest = getBanner().then(res => {
      bannerList = res.data.bannerList
    })
    // 请求首页热门课程与热门教师
    let hotCourseList = []
    let hotTeacherList = []
    let hotReuqest = getHotCourseAndTeacher().then(res => {
      hotCourseList = res.data.hotCourse
      hotTeacherList = res.data.hotTeacher
    })
    // 当所有请求完成的时候返回
    return Promise.all([bannerRequest,hotReuqest]).then(() => {
      return {
        bannerList,
        hotCourseList,
        hotTeacherList
      }
    }).catch(() => {
      app.router.push('/404')
    })
  }
}
</script>

<style lang="scss" scoped>
.content-container{
  box-sizing: border-box;
  min-width: 1200px;
  width:100%;
  margin: 15px auto;
}
</style>
