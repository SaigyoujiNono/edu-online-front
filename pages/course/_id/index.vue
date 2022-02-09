<template>
  <el-main id="app-container">
    <div class="content-container course-container mt8">
      <div class="cover-container shadow-hover">
        <img :src="course.cover" alt="cover">
        <div class="statistics">
          <div class="stat-detail">
            <h4>购买数</h4>
            <p>{{course.buyCount}}</p>
          </div>
          <div class="stat-detail">
            <h4>课时数</h4>
            <p>{{course.lessonNum}}</p>
          </div>
          <div class="stat-detail">
            <h4>浏览数</h4>
            <p>{{course.viewCount}}</p>
          </div>
        </div>
        <div class="info">
          <div class="course-title">
            <h2>{{course.title}}</h2>
            <div class="price">价格:<span>{{'￥'+course.price}}</span></div>
          </div>
          <div class="course-intro">
            <div class="intro-item">主讲: <span>{{course.teacher.name}}</span></div>
            <div class="intro-item"><a class="collection-btn"><fa class="search-icon" :icon="['fas', 'star']"/>点击收藏</a></div>
            <div class="intro-item"><button class="view-btn">立即观看</button></div>
          </div>
        </div>
      </div>
      <el-row class="mt8" :gutter="20">
        <el-col :span="16">
          <el-card>
            <el-tabs v-model:active-name="activeName">
              <el-tab-pane label="课程描述" name="description" v-html="course.description"></el-tab-pane>
              <el-tab-pane label="目录" name="chapter">
                <Chapter :chapter="course.chapter"></Chapter>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <el-tabs :active-name="'teacher'">
              <el-tab-pane label="教师信息" name="teacher">
                <TeacherIntro :teacher="course.teacher"></TeacherIntro>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import {getCourseInfo} from "@/api/course";

export default {
  name: "course_id",
  head(){
    return this.$seo(this.course.title, this.course.title)
  },
  data(){
    return {
      activeName:'description'
    }
  },
  watch:{
  },
  methods:{
  },
  computed:{
  },
  mounted() {
  },
  async asyncData({route,redirect}){
    const {id} = route.params
    let course;
    await getCourseInfo(id).then(res=>{
      course = res.data.courseInfo
    }).catch(()=>{
      redirect('/404')
    })
    return {
      course
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/variables.scss';
.course-container{
  .cover-container{
    color: $font-stat;
    display: flex;
    img[alt=cover]{
      height: 450px;
      width: 750px;
    }
    .statistics{
      width: 120px;
      background-color: $background-stat-1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .stat-detail{
        flex: 1;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        &::after{
          content: '';
          width: 70%;
          height: 2px;
          position: absolute;
          background-color: rgba(255,255,255,0.4);
          bottom: 0;
        }
        &:nth-of-type(3){
          &::after{
            height: 0;
          }
        }
      }
    }
    .info{
      flex: 1;
      background-color: $background-stat-2;
      padding:{
        top: 12px;
        left: 1em;
        right: 1em;
      }
      .course-title{
        height: 35%;
        position: relative;
        .price{
          position: absolute;
          bottom: 10%;
          span{
            margin-left: 0.5em;
            font-size: 28px;
            font-weight: bold;
            color: $font-price-2;
          }
        }
        &::after{
          content: '';
          position: absolute;
          width: 90%;
          height: 1px;
          margin-left: 5%;
          background-color: rgba(255,255,255,0.4);
          box-shadow: 0 0 5px rgba(0,0,0,0.3);
          bottom: 0;
        }
      }
      .course-intro{
        .intro-item{
          padding: {
            top: 16px;
            bottom: 16px;
          }
          .collection-btn{
            transition: all 0.5s;
            cursor: pointer;
            &:hover{
              color: $font-price-2;
            }
          }
          .view-btn{
            font-size: 24px;
            background-color: rgba(0,0,0,0);
            border: 1px solid $color-btn-entry;
            border-radius: 32px;
            color: $color-btn-entry;
            letter-spacing: 0.5em;
            transition: all 0.5s;
            padding: {
              top: 12px;
              bottom: 12px;
              left: 1em;
              right: 0.5em;
            };
            &:hover{
              color: $font-stat;
              background-color: $color-btn-entry;
            }
          }
        }
      }
    }
  }
}
</style>
