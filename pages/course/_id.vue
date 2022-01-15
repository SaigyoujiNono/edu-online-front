<template>
  <el-main id="app-container">
    <div class="content-container course-container">
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
            <div class="intro-item">主讲: <span>{{teacher.name}}</span></div>
            <div class="intro-item"><a class="collection-btn"><fa class="search-icon" :icon="['fas', 'star']"/>点击收藏</a></div>
            <div class="intro-item"><button class="view-btn">立即观看</button></div>
          </div>
        </div>
      </div>
      <div class="course-info shadow-hover">
        <ul class="select-tab">
          <li @click="courseTab = 0" :class="courseTab === 0 ? 'active':''">课程信息</li>
          <li @click="courseTab = 1" :class="courseTab === 1 ? 'active':''">课程列表</li>
        </ul>
        <div v-if="courseTab === 0" class="course-desc" v-html="courseDesc">
        </div>
        <ul v-if="courseTab === 1" class="course-list">
            <li v-for="chapter in courseChapter">
              <p class="course-chapter">{{chapter.title}}</p>
              <ul class="video-list">
                <li v-for="video in chapter.children"><nuxt-link class="course-video" to="/"><fa :icon="['far', 'circle']"/>&emsp;<span v-if="video.isFree === true" class="icon-free">免费</span>&emsp;{{video.title}}</nuxt-link></li>
              </ul>
            </li>
        </ul>
      </div>
      <div class="course-teacher shadow-hover">
        <ul class="select-tab">
          <li class="active">教师信息</li>
        </ul>
        <div class="teacher-desc">
          <nuxt-link to="/"><img class="teacher-avatar" :src="teacher.avatar" alt=""></nuxt-link>
          <div class="teacher-name"><nuxt-link to="/" >{{teacher.name}}</nuxt-link></div>
          <div class="teacher-level">{{teacherLevel}}</div>
          <div class="teacher-level">{{teacher.career}}</div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import {getCourse, getCourseChapter, getCourseDesc} from "@/api/course";
import {getTeacher} from "@/api/teacher";

export default {
  name: "course_id",
  head(){
    return this.$seo(this.course.title, this.course.title)
  },
  data(){
    return {
      courseTab: 0,
      teacher:{},
      courseDesc: '',
      courseChapter: []
    }
  },
  watch:{
    courseTab(){
      if (this.courseChapter.length === 0){
        //获取课程章节
        getCourseChapter({id:this.course.id}).then(res=>{
          this.courseChapter = res.data.courseChapter
        })
      }
    }
  },
  computed:{
    teacherLevel(){
      if (this.teacher.level === 1){
        return '高级讲师'
      }else if (this.teacher.level === 2){
        return '首席讲师'
      }else{
        return ''
      }
    }
  },
  mounted() {
    const id = this.course.teacherId
    //获取课程教师信息
    getTeacher({id}).then(res=>{
      this.teacher = res.data.teacher
    }).catch(err=>{
      this.$notify.error(err)
    })
    //获取课程描述
    getCourseDesc({id:this.course.id}).then(res=>{
      this.courseDesc = res.data.courseDesc.description
    }).catch(err=>{
      this.$notify.error(err)
    })
  },
  async asyncData({route,redirect}){
    const {id} = route.params
    const course = await getCourse({id}).then(res=>{
      return res.data.course
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
@import '~assets/scss/variables.scss';
.course-container{
  margin:{
    top:24px;
    bottom: 24px;
  }
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
  .course-info,.course-teacher{
    background-color: $background-course;
    box-sizing: border-box;
    border-radius: 8px;
    margin: {
      top: 24px;
      bottom: 24px;
    };
    float: left;
    .select-tab{
      color: $font-normal;
      padding: {
        left: 24px;
      };
      position: relative;
      display: flex;
      letter-spacing: 0.2em;
      font-size: 20px;
      li{
        margin:{
          right: 16px;
        };
        padding: {
          left: 0.2em;
          top: 8px;
          bottom: 8px;
        };
        cursor: pointer;
        &.active{
          color: $font-hover-green;
          position: relative;
          &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: $font-hover-green;
            left: 0;
            bottom: 0;
          }
        }
      }
      &::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: rgba(0,0,0,0.3);
        bottom: 0;
        left: 0;
      }
    }
  }
  .course-info{
    width: 800px;
    .course-desc{
      color: $font-normal;
      font-size: 20px;
      line-height: 30px;
      padding: {
        left: 1em;
        right: 1em;
        top: 2em;
        bottom: 2em;
      };
    }
    .course-list{
      color: $font-list;
      padding: {
        left: 1em;
        right: 1em;
        top: 2em;
        bottom: 2em;
      };
      .course-chapter,.course-video{
        cursor: pointer;
        border: 1px solid rgba(0,0,0,0.3);
        margin-bottom: 2px;
        padding: {
          left: 1em;
          right: 1em;
          top: 0.7em;
          bottom: 0.7em;
        };
        border-radius: 4px;
      }
      .course-chapter{
        background-color: #efefef;
      }
      .course-video{
        display: block;
        margin-left: 2em;
        background-color: #ffffff;
        &:hover{
          color: $font-hover-green;
          background-color: $background-default;
        }
      }
    }
  }
  .course-teacher{
    margin-left: 50px;
    width: 350px;
    .teacher-avatar{
      display: block;
      margin: 18px auto;
      height: 200px;
      width: 180px;
    }
    .teacher-name,.teacher-level{
      display: flex;
      justify-content: center;
      margin: 18px auto;
    }
    .teacher-level{
      color: $font-hint;
    }
  }
}
</style>
