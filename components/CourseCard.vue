<template>
  <div class="course-card entry-anime" :style="`--et:${entryIndex}s`">
    <div class="title-img">
      <router-link :to="`/course/${course.id}`">
        <img :src="course.cover" alt="">
        <div class="mask-img">
          <p>开始学习</p>
        </div>
      </router-link>

    </div>
    <div class="title">
      <router-link :to="`/course/${course.id}`">{{course.title}}</router-link>
    </div>
    <div class="info">
      <div class="count">
        <span><i class="fa fa-eye"></i> {{course.viewCount}}</span>
        <span><i class="fa fa-comment" aria-hidden="true"></i> {{course.commentCount}}123</span>
      </div>
      <div class="price">
        <div v-if="course.price === 0" class="free">
          <span>免费</span>
        </div>
        <div v-else class="charge">
          <span>￥{{course.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: ['course','entryIndex']
}
</script>

<style lang="scss" scoped>
$baseColor: rgb(85, 218, 195);
.course-card{
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 10px 10px;
  width: 380px;
  height:320px;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.5);
  border-radius:10px;
  //标题头图
  .title-img{
    position: relative;
    height: 220px;
    width: 100%;
    overflow: hidden;
    border-radius:10px;
    img{
      border-radius:10px;
      width:100%;
      height: 100%;
      transition: 0.5s;
    }
    &:hover{
      .mask-img{
        height: 100%;
      }
      img{
        transform: scale(1.15);
      }
    }
  }
  //头图蒙版
  .mask-img{
    border-radius:10px;
    transition: all 0.5s;
    position: absolute;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      color: rgba(255,255,255,0.8);
      position:relative;
      padding: 5px 2em;
      &::before{
        content: "";
        position:absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        border-radius:1em;
        border: 2px solid rgba(255,255,255,0.8);;
      }
    }
  }
  //标题
  .title{
    margin-top:10px;
    padding: 0 15px;
    a{
      font-size:1.4em;
    }
  }
  .info{
    flex: auto;
    display:flex;
    align-items: center;
    padding: 0 15px;
    .count{
      width: 60%;
      height: 100%;
      //background-color:aqua;
      color:rgba(0,0,0,0.65);
      display: flex;
      align-items: center;
      span{
        margin-right: 10px;
      }
    }
    .price{
      width: 40%;
      height: 100%;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      //免费时的显示效果
      .free{
        span{
          background-color:$baseColor;
          color: rgba(255,255,255,0.9);;
          padding: 2px 8px;
          border-radius:5px;
        }
      }
      //收费显示效果
      .charge{
        font-size:18px;
        color: red;
      }
    }

  }
}

</style>
