<template>
  <div class="course-card">
    <div class="cover">
      <img :src="course.cover" alt="">
      <nuxt-link class="course-msk" to="/"><span>开始学习</span></nuxt-link>
    </div>
    <div class="info">
      <span class="title"><nuxt-link to="/">{{course.title}}</nuxt-link></span>
    </div>
    <div class="info">
      <span class="study">{{course.viewCount}}人正在学习</span>
      <span v-if="course.price <= 0" class="free">免费</span>
      <span v-else class="price">￥{{course.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props:['course'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
.course-card{
  .cover{
    height: 180px;
    width: 320px;
    position: relative;
    overflow: hidden;
    &:hover{
      .course-msk{
        top: 0;
      }
      img{
        transform: scale(1.2);
      }
    }
    .course-msk{
      position: absolute;
      background-color: rgba(0,0,0,0.4);
      height: 100%;
      width: 100%;
      left: 0;
      top: 100%;
      color: $font-msk;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
      span{
        border: 2px solid $font-msk;
        padding: 2px 8px;
        border-radius: 16px;
      }
    }
    img{
      height:100%;
      width: 100%;
      transition: all 0.5s;
    }
  }
  .info{
    .title{
      font-size: 18px;
      color: $font-normal;
      font-weight: 600;
      transition: all 0.5s;
      &:hover{
        color: $font-hover-green;
      }
    }
    .study{
      font-size: 14px;
      line-height: 25px;
      color: $font-hint;
    }
    .free{
      float: right;
      background-color: $font-hover-green;
      color: $font-white;
      padding: 2px 8px;
    }
    .price{
      float: right;
      color: $font-price;
      padding: 2px 8px;
    }
  }
}
</style>
