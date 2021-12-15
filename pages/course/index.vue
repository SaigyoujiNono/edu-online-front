<template>
  <el-main>

  </el-main>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      primaryCategory: [
        {id: 123456,title: '编程语言'},
        {id: 12366,title: '设计'},
        {id: 12756456,title: '后端'},
        {id: 12345656,title: '前端'},
      ],
      primaryIndex:null,
      secondCategory: [
        {id: 14866,title: 'C++'},
        {id: 43543543,title: 'java'},
        {id: 456877,title: 'javascript'},
        {id: 4234,title: 'rust'},
      ],
      secondIndex:null,
      courseList: []
    }
  },
  created() {
    for (let i = 0; i < 16; i++) {
      let course = {
        cover:'https://10.idqqimg.com/qqcourse_logo_ng/ajNVdqHZLLDaRTUFiciaoUz5Wvp5PE4hGsZWvsaibaCA0hXrEcwxrWOdKJkUWq8OacwrdCs50tyYias/440',
        title:'JAVA架构师',
        price: i<4? 0:5.5,
        viewCount: 15,
        commentCount: 32
      }
      this.courseList.push(course)
    }
    this.primaryIndex = this.primaryCategory[0].id
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      if (to.query.second){
        vm.secondIndex = to.query.second
      }else {
        vm.secondIndex = null
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query.primary){
      this.primaryIndex = to.query.primary
    }else {
      this.primaryIndex = this.primaryCategory[0].id
    }
    if (to.query.second){
      this.secondIndex = to.query.second
    }else {
      this.secondIndex = null
    }
    next()
  },
}
</script>

<style lang="scss" scoped>
</style>
