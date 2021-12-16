<template>
  <el-main id="app-container">
    <div class="content-container teacher-container">
      <el-empty style="width: 100%" v-if="!teacherList || teacherList.length === 0" :image-size="200"></el-empty>
      <TeacherCard v-for="item in teacherList" :teacher="item" :key="item.id"/>
    </div>
    <div class="content-container pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="pageInfo.total"
        :page-size="pageInfo.size"
      >
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
import {getTeacher} from "@/api/teacher";

export default {
  name: "teacher",
  data(){
    return {
      pageInfo:{},
      teacherList: []
    }
  },
  methods:{
    handleCurrentChange(current){
      this.$router.push({name:'teacher',query:{current}})
    }
  },
  mounted() {
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      const current = to.query.current ?to.query.current:1
      getTeacher({current}).then(res=>{
        vm.teacherList = res.data.teacherList
        vm.pageInfo = res.data.pageInfo
      })
    })
  },
  beforeRouteUpdate(to,from,next){
    const current = to.query.current
    getTeacher({current}).then(res=>{
      this.teacherList = res.data.teacherList
      this.pageInfo = res.data.pageInfo
    })
    next()
  }
}
</script>

<style lang="scss" scoped>
.teacher-container{
  margin-top: 16px;
  .teacher-card{
    margin-bottom: 16px;
  }
}
</style>
