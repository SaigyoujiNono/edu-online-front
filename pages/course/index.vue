<template>
  <div class="all-container">
    <div class="nav-container">
      <div class="nav-key">
        <span>一级分类</span>
      </div>
      <div class="nav-list">
        <ul>
          <li v-for="item in primaryCategory">
            <router-link :class="primaryIndex==item.id? 'active':''" :to="`/course?primary=${item.id}`">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="secondCategory[0]" class="nav-container">
      <div class="nav-key">
        <span>二级分类</span>
      </div>
      <div class="nav-list">
        <ul>
          <li v-for="item in secondCategory">
            <router-link :class="secondIndex==item.id? 'active':''" :to="`/course?primary=${primaryIndex}&second=${item.id}`">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="list-container">
      <CourseCard v-for="(item,index) in courseList" :key="index" :entry-index="index" :course="item"/>
    </div>
    <Pagination />
  </div>
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
.all-container{
  width: 2000px;
  margin: 40px auto;
  .nav-container{
    width: 100%;
    display: flex;
    flex-direction: row;
    height:60px;
    align-items: center;
    .nav-key{
      width:10%;
      cursor: pointer;
      text-align:center;
      span{
        color: rgba(0, 0, 0, 0.8);
        font-size:20px;
        font-weight: 600;
        letter-spacing: 0.3em;
      }
    }
    .nav-list{
      height: 100%;
      flex: 1;
      ul{
        display:flex;
        flex-direction: row;
        height: 100%;
        li{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 0 10px;
          a{
            color: rgba(0, 0, 0, 0.6);
            display: flex;
            position: relative;
            align-items: center;
            padding: 0 15px;
            transition: all 0.5s;
            &::before{
              content: "";
              position: absolute;
              bottom: 15%;
              left: 10%;
              height: 0;
              width: 80%;
              background-color: #37ff00;
              z-index:-1;
              transition: all 0.5s;
            }
            &.active{
              color: rgba(0, 0, 0, 0.8);
              &::before{
                height: 5px;
              }
            }
          }
        }
      }
    }
  }
  .list-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
@media screen and(max-width:2500px){
  .all-container{
    width: 2000px;
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media screen and(max-width:2400px){
  .all-container{
    width: 1600px;
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media screen and(max-width:2000px){
  .all-container{
    width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
