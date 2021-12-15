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
          <input class="search-input" type="text" v-model="searchContent" placeholder="请输入搜索内容">
          <fa class="search-icon" :icon="['fas', 'search']" />
        </div>
      </div>
      <ul class="user-info">
        <li v-if="isLogin">
          <nuxt-link to="/">
            <img src="https://www.dazhuanlan.com/system/letter_avatars/n.png" alt="">
          </nuxt-link>
        </li>
        <li v-if="isLogin">
          <nuxt-link class="username" to="/">SaigyoujiNono</nuxt-link>
        </li>
        <li v-if="!isLogin">
          <nuxt-link class="username" to="/login">登录/注册</nuxt-link>
        </li>
      </ul>
    </div>

  </el-header>
</template>

<script>
export default {
  name: "Navbar",
  data(){
    return{
      itemsList:[],
      searchContent: '',
      isLogin:false
    }
  },
  methods: {
  },
  mounted() {
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
          width: 240px;
          height: 40px;
          outline: none;
          border: none;
          font-size: inherit;
          color: inherit;
          padding: 0 0.5em;
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
