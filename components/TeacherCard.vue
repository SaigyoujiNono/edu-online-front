<template>
  <div class="teacher-card entry-anime" :style="`--et:${entryIndex}s`">
    <div class="avatar">
      <router-link :to="`/teacher/${teacher.id}`">
        <img :src="teacher.avatar" alt="">
      </router-link>
    </div>
    <div class="title">
      <router-link :to="`/teacher/${teacher.id}`">
        <span class="name">{{teacher.name}}</span>
      </router-link>
      <div class="easy">
        <span>{{teacher.career}}</span>
      </div>
    </div>
    <div class="intro">
      <span>{{teacher.intro}}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherCard",
  props: ['teacher','entryIndex']
}
</script>

<style lang="scss" scoped>
//老师卡
.teacher-card{
  position:relative;
  width: 380px;
  height: 450px;
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.6);
  border-radius:5px;
  transition: all 0.5s;
  &:hover{
    box-shadow: 2px 2px 5px rgba(0, 0, 0,0.5);
  }
  .avatar{
    height:200px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover img{
      transform: rotateY(360deg);
    }
    img{
      height: 180px;
      width: 180px;
      border-radius:50%;
      transition: all 0.5s;
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
  }
  .title{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;
    height:80px;
    .name{
      font-size:24px;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 600;
    }
    .easy{
      width: 100%;
      font-size:18px;
      flex: auto;
      display: flex;
      align-items: center;
      span{
        padding:0 2em;
        overflow: hidden;
        white-space: nowrap; // 文本超出范围强制不换行
        text-overflow: ellipsis; //文本超出范围显示三个点
      }
      &:before{
        content: "";
        position:absolute;
        bottom: -1em;
        left: 10%;
        width: 80%;
        height: 2px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .intro{
    flex: 1;
    margin-top:2.2em;
    text-indent:2em;
    font-size:16px;
    padding: 5px 6px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
