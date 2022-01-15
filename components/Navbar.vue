<template>
  <el-header height="60px" class="navbar shadow-bottom">
    <div class="navbar-container">
      <nuxt-link class="logo" to="/"><img src="@/static/LOGO.png" alt=""></nuxt-link>
      <ul class="menu">
        <li><nuxt-link to="/">首页</nuxt-link></li>
        <li><nuxt-link to="/course">全部课程</nuxt-link></li>
        <li><nuxt-link to="/teacher">全部教师</nuxt-link></li>
        <li><nuxt-link to="/about">关于</nuxt-link></li>
      </ul>
      <div class="search">
        <div class="search-container">
          <input class="search-input" type="text" v-model="searchContent" @keydown.enter="searchHandler()" placeholder="请输入搜索内容">
          <fa class="search-icon" :icon="['fas', 'search']" @click="searchHandler()"/>
        </div>
      </div>
      <ul class="user-info">
        <li v-if="isLogin">
          <nuxt-link to="/my">
            <img :src="avatar" alt="">
          </nuxt-link>
        </li>
        <li v-if="isLogin">
          <nuxt-link class="username" to="/my">{{userName}}</nuxt-link>
        </li>
        <li v-if="isLogin">
          <a class="username" @click="logout()" href="javascript:void(0);">登出</a>
        </li>
        <li v-if="!isLogin">
          <nuxt-link class="username" to="/login">登录/注册</nuxt-link>
        </li>
      </ul>
    </div>

  </el-header>
</template>

<script>
import cookie from 'js-cookie'
export default {
  name: "Navbar",
  head:{
    title:'我的-在线教育'
  },
  data(){
    return{
      itemsList:[],
      searchContent: ''
    }
  },
  methods: {
    //登出
    logout(){
      cookie.set('auth-token','')
      this.$store.commit('logoutUser')
    },
    //搜索
    searchHandler(){
      console.log('search')
    }
  },
  computed:{
    //是否登录
    isLogin(){
      if (this.$store.state.userInfo){
        return true
      }
    },
    //用户名
    userName(){
      console.log('username')
      if (this.$store.state.userInfo.nickname){
        return this.$store.state.userInfo.nickname
      }
      if (this.$store.state.userInfo.mobile){
        return this.$store.state.userInfo.mobile
      }
      if (this.$store.state.userInfo.email){
        return this.$store.state.userInfo.email
      }
    },
    //头像
    avatar(){
      if (this.$store.state.userInfo.avatar){
        return this.$store.state.userInfo.avatar
      }else {
        return 'https://www.dazhuanlan.com/system/letter_avatars/n.png'
      }
    }
  },
  mounted() {
    //第一次加载获取用户信息
    const token = cookie.get('auth-token')
    if (token && token !==''){
      this.$store.dispatch('loginUser',token)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
.navbar{
  z-index: 1;
  position: sticky;
  top: 0;
  color:$font-normal;
  font-size: 16px;
  background-color: $background-header;
  .navbar-container{
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    .logo{
      width: 140px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .menu{
      margin-left: 2em;
      display: flex;
      li{
        display: flex;
        a{
          padding: 0 15px;
          display: flex;
          align-items: center;
          &:hover{
            color: $font-hover;
            background-color:$background-hover;
          }
        }
      }
    }
    .search{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-container{
        position: relative;
        display: flex;
        align-items: center;
        .search-input{
          box-sizing: border-box;
          width: 240px;
          height: 40px;
          outline: none;
          border: none;
          font-size: inherit;
          color: inherit;
          padding: 0 1.5em 0 0.5em;
          &::placeholder {
            color: $font-hint;
          }
        }
        .search-icon{
          position: absolute;
          right: 5px;
          color: $font-hint;
          transition: all 0.5s;
          &:hover{
            color: $font-normal;
          }
        }
      }
    }
    .user-info{
      display: flex;
      li{
        display: flex;
      }
      img{
        border-radius: 50%;
        height: 60px;
        width: 60px;
      }
      .username{
        padding: 0 15px;
        display: flex;
        align-items: center;
        &:hover{
          color: $font-hover;
          background-color:$background-hover;
        }
      }
    }
  }

}
</style>
