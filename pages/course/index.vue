<template>
  <el-main id="app-container">
    <div class="category-container">
      <div class="one">
        <h3 class="title">一级分类</h3>
        <ul class="category">
          <li v-for="item in primarySubject" :key="item.id"><a :class="primaryId === item.id?'active':''" @click="changePrimary(item.id,primaryId === item.id)" >{{item.title}}</a></li>
        </ul>
      </div>
      <div v-if="secondSubject && secondSubject.length!==0" class="one two">
        <h3 class="title">二级分类</h3>
        <ul class="category">
          <li v-for="item in secondSubject" :key="item.id"><a :class="secondId === item.id?'active':''" @click="changeSecond(item.id,secondId === item.id)">{{item.title}}</a></li>
        </ul>
      </div>
    </div>
    <div class="course-container content-container">
      <el-empty style="width: 100%" v-if="!courseList || courseList.length === 0" :image-size="200"></el-empty>
      <CourseCard v-for="item in courseList" :course="item" size="sm" :key="item.id"/>
    </div>
    <div class="content-container pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
import {getPrimarySubject, getSecondSubject} from "@/api/subject";
import {getCourse} from "@/api/course";

export default {
  name: "course",
  data(){
    return {
      courseList:[],
      secondSubject: [],
      primaryId: null,
      secondId: null,
      pageInfo: {}
    }
  },
  async asyncData(){
    let primarySubject = await getPrimarySubject().then(res=>{
      return res.data.subject
    }).catch(err=>{
      console.error(err)
      return []
    })
    return { primarySubject }
  },
  watch:{
    primaryId(){
      if (this.primaryId && this.primaryId !==''){
        getSecondSubject(this.primaryId).then(res=>{
          this.secondSubject = res.data.subject
        })
      }
    }
  },
  methods: {
    //改变主分类
    changePrimary(id,isActive){
      if (isActive){
        this.primaryId = null
        this.$router.push({name:'course'})
        return
      }
      this.$router.push({name:'course',query:{primary:id}})
    },
    //改变次级分类
    changeSecond(id,isActive){
      if (isActive){
        this.secondId = null
        this.$router.push({name:'course',query:{primary:this.primaryId}})
        return
      }
      this.secondId = id
      this.$router.push({name:'course',query:{primary:this.primaryId,second:this.secondId}})
    },
    //根据条件获取课程
    fetchCourse(params){
      getCourse(params).then(res=>{
        this.courseList = res.data.courseList
        this.pageInfo = res.data.pageInfo
      })
    },
    //分页
    handleCurrentChange(current){
      this.$router.push({name:'course',query:{primary:this.primaryId,second:this.secondId,current}})
    }
  },
  created() {
  },
  beforeRouteEnter(to,from,next){
    const primary = to.query.primary
    const second = to.query.second
    const current = to.query.current
    next(vm=>{
      vm.primaryId = primary
      vm.secondId = second
      vm.fetchCourse({subjectParentId:primary,subjectId:second,current})
    })
  },
  beforeRouteUpdate(to,from,next){
    const primary = to.query.primary
    const second = to.query.second
    const current = to.query.current
    if (primary && primary !== ''){
      this.primaryId = primary
    }else {
      this.secondSubject = []
    }
    if (second && second !== ''){
      this.secondId = second
    }
    this.fetchCourse({subjectParentId:primary,subjectId:second,current})
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
a{
  cursor: pointer;
}
.category-container{
  width: 1200px;
  margin: 20px auto;
  padding: 30px 16px;
  box-sizing: border-box;
  border: 1px solid $border-category;
  background-color: #ffffff;
  color:$font-category;
  .one{
    display: flex;
    .title{}
    .category{
      height: 30px;
      margin-left: 18px;
      display: flex;
      li{
        a{
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: 16px;
          padding-right: 16px;
          transition: all 0.5s;
          &:hover{
            color:$font-hover-green;
          }
          &.active{
            color: $font-hover;
            background-color:$background-hover;
          }
        }
      }
    }
  }
  .two{
    margin-top: 16px;
  }
}
.course-container{
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  .course-card{
    margin-right: 20px;
    margin-bottom: 18px;
  }
}
.pagination-container{
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}
</style>
