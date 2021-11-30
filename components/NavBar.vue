<template>
  <!-- 导航 -->
  <div class="nav-container">
    <div ref="navLeft" class="nav-item left">
      <div class="logo">
        <router-link to="/"><h1>NONO</h1></router-link>
      </div>
      <ul>
        <li class=".nav-tab"><router-link to="/">首页</router-link></li>
        <li class=".nav-tab"><router-link to="/course">课程</router-link></li>
        <li class=".nav-tab"><router-link to="/teacher">老师</router-link></li>
        <li class=".nav-tab"><router-link to="/about">关于</router-link></li>
      </ul>
    </div>
    <div class="nav-item middle-nav-item">
      <div class="nav-item-search">
        <input ref="searchInput" v-model="searchContent" type="text" name="search" placeholder="搜索内容" id="nav-search">
        <button type="submit" @click="submitSearch">
          <svg style="width:22px;height:22px;" viewBox="0 0 24 24">
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="nav-item right">
      <ul>
        <li ref="avatarItem" id="nav-user-avatar" style="width:65px;">
          <div ref="avatar" class="avatar-container">
            <router-link to="/login">
              <img class="nav-avatar" src="https://img1.baidu.com/it/u=3921673502,2542489910&fm=26&fmt=auto" alt="">
            </router-link>
          </div>
          <div ref="avatarList" class="profile-panel">
            <ul>
              <li v-for="item in userInfoList"><a target="_blank" href="https://www.baidu.com">{{item.name}}</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      searchContent: "",
      userInfoList: [
        {name: '个人信息'},
        {name: '个人信息'},
        {name: '个人信息'},
        {name: '个人信息'},
        {name: '个人信息'}
      ]
    }
  },
  methods: {
    //搜索框提交按钮
    submitSearch() {
      console.log(this.searchContent);
    }
  },
  mounted() {
    //移入移出鼠标
    this.$refs.navLeft.addEventListener('mouseover',(e)=>{
      if (e.target.tagName === 'A') {
        e.target.classList.add('item-hover')
      }
    })
    this.$refs.navLeft.addEventListener('mouseout',(e)=>{
      if (e.target.tagName === 'A') {
        e.target.classList.remove('item-hover')
      }
    })

    // 头像效果
    this.$refs.avatarItem.addEventListener('mouseover', (e) => {
      this.$refs.avatar.classList.add('nav-avatar-hover')
      this.$refs.avatarList.classList.add('profile-panel-hover')
      if (e.target.tagName === 'A') {
        e.target.classList.add('item-hover')
      }
    })
    this.$refs.avatarItem.addEventListener('mouseout', (e) => {
      this.$refs.avatar.classList.remove('nav-avatar-hover')
      this.$refs.avatarList.classList.remove('profile-panel-hover')
      if (e.target.tagName === 'A') {
        e.target.classList.remove('item-hover')
      }
    })
    // this.$refs.avatarList.addEventListener()
  }
}
</script>

<style lang="scss" scoped>
$search-width: 250px;
.nav-container {
  z-index: 1;
  font-size: 16px;
  color: rgba(255, 255, 255, .8);
  font-weight: 500;
  input {
    font-size: 16px;
    color: rgba(255, 255, 255, .8);
    font-weight: 500;
  }
  top: 0;
  position: sticky;
  width: 100%;
  min-width: 1200px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  display: flex;
  justify-content: center;
  .nav-item {
    height: 49px;
    box-sizing: border-box;
    display: flex;
    button[type=submit]>svg {
      fill: currentColor;
    }
    .logo {
      width: 100px;
      height: 100%;
      a{
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: inherit;
        display: flex;
        h1 {
          display: flex;
          align-self: center;
          justify-content:center;
        }
      }
    }
    .nav-item-search {
      display: flex;
      align-items: center;
      color: rgba(238, 238, 238, .4);
      &:hover,
      &:focus-within {
        color: rgba(238, 238, 238, .8);
      }
      #nav-search {
        background-color: rgba(0, 0, 0, 0);
        outline: 0;
        width: $search-width;
        height: 2em;
        border: none;
        border-bottom: 1.5px solid;
        padding-right: 32px;
        padding-left: 4px;
        color: inherit;
        &::-webkit-input-placeholder {
          color: inherit;
        }
      }
    }
    button[type=submit] {
      background-color: Transparent;
      color: inherit;
      border: none;
      cursor: pointer;
      position: relative;
      right: 28px;
      top: 4px;
    }
    >ul {
      display: flex;
      margin-left: 16px;
      li {
        list-style: none;
        display: flex;
        justify-content: center;
        margin-left: 4px;
        >a {
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 0 12px;
          color: inherit;
          transition: background-color 0.6s;
          border-radius: 4px;
        }
        .item-hover {
          background-color: rgba(0, 0, 0, .4);
        }
      }
    }
  }
  .left,
  .right {
    width: 30vw;
    min-width: 450px;
  }
  .middle-nav-item {
    width: 20vw;
    min-width: 300px;
    justify-content: center;
  }
  // 搜索框下拉框内容
  .search-content {
    transition: all 1s;
    opacity: 0;
    // display: none;
    height: 0;
    position: absolute;
    overflow: hidden;
    top: 56px;
    width: $search-width;
    background-color: rgba(0, 0, 0, .4);
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    border-radius: 5px;
    box-sizing: border-box;
    ul {
      display: flex;
      flex-direction: column;
      li {
        list-style: none;
        display: flex;
        justify-content: center;
        a {
          width: 100%;
          display: flex;
          text-decoration: none;
          font-size: 18px;
          color: inherit;
          padding: 5px 16px;
          justify-content: left;
          transition: .5s;
          border-radius: 4px;
        }
        .li-a-hover {
          background-color: rgba(0, 0, 0, .7);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
  .search-content-active {
    // display: block;
    padding: 8px;
    height: fit-content;
    opacity: 1;
  }
  //导航栏右侧
  .right {
    display: flex;
    justify-content: flex-end;
    .profile-panel {
      transition: .7s;
      overflow: hidden;
      height: 0px;
      opacity: 0;
      top: 49px;
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 200px;
      background-color: red;
      z-index: -1;
      background-color: rgba(0, 0, 0, .4);
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      ul {
        margin-top: 20px;
        margin-bottom: 5px;
        display: flex;
        flex-direction: column;
        li {
          list-style: none;
          display: flex;
          justify-content: center;
          a {
            width: 100%;
            display: flex;
            text-decoration: none;
            font-size: 18px;
            color: inherit;
            padding: 5px 10px;
            margin-right: 3px;
            justify-content: left;
            transition: .5s;
            border-radius: 4px;
          }
          .li-a-hover {
            background-color: rgba(0, 0, 0, .7);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
    .profile-panel-hover {
      height: fit-content;
      opacity: 1;
    }
    .avatar-container {
      display: flex;
      position: relative;
      box-sizing: border-box;
      border-radius: 50%;
      overflow: hidden;
      a{
        display: flex;
        position: relative;
      }
      //头像效果
      .nav-avatar {
        border-radius: 50%;
        transition: .5s;
      }
    }
    //鼠标悬停头像效果
    .nav-avatar-hover {
      transform: rotate(360deg);
      height: 65px;
      width: 65px;
      box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.4);
      .nav-avatar {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
