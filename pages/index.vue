<template>
  <el-main id="app-container">
    <div class="carousel">
      <el-carousel trigger="click" height="600px">
        <el-carousel-item v-for="(item,index) in carouselList" :key="index">
          <nuxt-link :to="item.url">
            <img height="100%" width="100%" :src="item.cover" alt="">
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="page">
      <div class="hot-container">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <div class="gap-btn">
        <nuxt-link to="" class="all-btn">全部课程</nuxt-link>
      </div>
      <div class="blank"></div>
      <div class="hot-container">
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
      </div>
      <div class="gap-btn">
        <nuxt-link to="" class="all-btn">全部教师</nuxt-link>
      </div>
    </div>
  </el-main>
</template>

<script>

export default {
  data() {
    return {
      carouselList:[
        {
          cover:'https://www.gulixueyuan.com/files/system/2021/12-08/0925244d224e170553.jpg?version=20.4.6',
          url:'/'
        },
        {
          cover:'https://www.gulixueyuan.com/files/system/2021/11-24/09261357e2cd981244.jpg?version=20.4.6',
          url:'/'
        },
        {
          cover:'https://www.gulixueyuan.com/files/system/2021/11-17/0943517b9c28919881.jpg?version=20.4.6',
          url:'/'
        },
        {
          cover:'https://www.gulixueyuan.com/files/system/2021/11-10/15054598065e088970.jpg?version=20.4.6',
          url:'/'
        }
      ]
    }
  },
  async asyncData({app}) {
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
