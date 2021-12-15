<template>
  <el-main id="app-container">
    <div v-if="carouselList && carouselList.length!==0" class="carousel">
      <el-carousel trigger="click" height="600px">
        <el-carousel-item v-for="item in carouselList" :key="item.id">
          <nuxt-link :to="item.linkUrl">
            <img height="100%" width="100%" :src="item.imageUrl" :alt="item.title">
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="page">
      <div class="hot-container">
        <el-empty v-if="!courseList || courseList.length === 0" :image-size="200"></el-empty>
        <CourseCard v-for="item in courseList" :course="item" />
      </div>
      <div class="gap-btn">
        <nuxt-link to="/course" class="all-btn">全部课程</nuxt-link>
      </div>
      <div class="blank"></div>
      <div class="hot-container">
        <el-empty v-if="!teacherList || teacherList.length === 0" :image-size="200"></el-empty>
        <TeacherCard v-for="item in teacherList" :teacher="item" />
      </div>
      <div class="gap-btn">
        <nuxt-link to="/teacher" class="all-btn">全部教师</nuxt-link>
      </div>
    </div>
  </el-main>
</template>

<script>

import {getBanner, getHotCourseAndTeacher} from "@/api";

export default {
  data() {
    return {
      courseList:[],
      teacherList:[]
    }
  },
  async asyncData() {
    let carouselList = await getBanner().then(res=>{
      return res.data.bannerList
    }).catch(err=>{
      console.error(err)
      return []
    })
    return {carouselList}
  },
  mounted() {
    getHotCourseAndTeacher().then(res =>{
      this.courseList = res.data.hotCourse
      this.teacherList = res.data.hotTeacher
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
.carousel{
  position: relative;
}
.page{
  margin-top: 15px;
  margin-bottom: 15px;
  .hot-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .course-card{
      margin: 8px 24px;
    }
    .teacher-card{
      margin: 8px 0;
    }
  }
  .gap-btn{
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .all-btn{
      color: $font-green;
      font-size: 24px;
      letter-spacing: 0.5em;
      border: 2px solid $font-green;
      padding: 6px 0.5em 6px 1em;
      border-radius: 40px;
      transition: all 0.5s;
      &:hover{
        color: $font-hover-green;
        border: 2px solid $font-hover-green;
      }
    }
  }
}
</style>
