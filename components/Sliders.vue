<template>
  <!-- 轮播图 -->
  <div class="slides-content" @mouseenter="cancelTimer" @mouseleave="setTimer">
<!--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
    <div class="sliders-container">
      <!-- 虚化背景 -->
      <div class="sliders-bg">
        <div class="sliders-bg" :style="`background-image: url(${slidersImgs[currentSlider].imageUrl})`"></div>
      </div>
      <!-- 存放图片 -->
      <section id="sliders-img-container">
        <!-- 显示区域 -->
        <div id="sliders-picture" class="sliders-picture">

            <router-link v-for="(image,index) in slidersImgs" :key="index" :to="image.linkUrl" class="link-picture">
              <transition :name="isLeft?'slider-left':'slider-right'" appear>
                <img ref="slidesImg" v-if="currentSlider===index" :src="image.imageUrl" class="sliders-img" alt="">
              </transition>
            </router-link>

        </div>
        <!-- 选择点区域 -->
        <div id="sliders-select" class="sliders-select">
          <a v-for="(_,index) in slidersImgs" :key="index" class="item" :class="currentSlider===index?'item-active':''" href="javascript:void(0)" @click="select(index,index>currentSlider)"></a>
        </div>
        <!-- 左右两个翻页按钮 -->
        <div id="sliders-bt-left" class="sliders-bt bt-left" @click="select(currentSlider-1,false)">
          <i class="fa fa-angle-left"></i>
        </div>
        <div id="sliders-bt-right" class="sliders-bt bt-right" @click="select(currentSlider+1,true)">
          <i class="fa fa-angle-right"></i>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sliders",
  props: ['slidersImgs'],
  data() {
    return {
      currentSlider: 0,
      loopTime: 6000,
      slidersTimer: null,
      isLeft: true
    }
  },
  mounted() {
    this.setTimer()
  },
  destroyed() {
    this.cancelTimer()
  },
  methods:{
    //设置定时器
    setTimer(){
      this.slidersTimer = setInterval(()=>{
        this.select(this.currentSlider+1,true);
      },this.loopTime)
    },
    //取消定时器
    cancelTimer(){
      clearInterval(this.slidersTimer)
    },
    select(index,isLeft){
      if (index >= this.slidersImgs.length){
        index = 0;
      }else if (index < 0){
        index = this.slidersImgs.length-1
      }
      this.isLeft = isLeft
      this.currentSlider = index;
    }
  }
}
</script>

<style lang="scss" scoped>
/* 简单的css transition实现动画 */
.slider-left-enter-active,
.slider-left-leave-active {
  transition: opacity 1s;
  animation: img-left-entry 1s forwards;
}
.slider-left-enter, .slider-left-leave-to {
  opacity: 0;
  animation: img-left-leave 1s forwards;
}
//向右移动
.slider-right-enter-active,
.slider-right-leave-active {
  transition: opacity 1s;
  animation: img-right-entry 1s;
}
.slider-right-enter, .slider-right-leave-to {
  opacity: 0;
  animation: img-right-leave 1s;
}
//轮播图
.sliders-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  min-width: 1200px;
  width:100%;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.2);
  // 背景虚化
  .sliders-bg {
    position: absolute;
    width: 150%;
    height: 150%;
    filter: blur(20px);
    background-position: center center;
  }
  section {
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    // 图片区域
    .sliders-picture {
      width: 100%;
      height: 100%;
      .link-picture {
        .sliders-img {
          position: absolute;
          //left: 1000px;
          width: 100%;
          height: 100%;
          //opacity: 0;
          //animation: img_left .5s linear forwards;
          object-fit: cover;
        }
        @keyframes img-left-entry {
          from {
            left: 1200px;
            opacity: 0;
          }
          to {
            left: 0;
            opacity: 1;
          }
        }
        @keyframes img-left-leave {
          from {
            left: 0;
            opacity: 1;
          }
          to {
            left: -1200px;
            opacity: 0;
          }
        }

        @keyframes img-right-entry {
          from {
            left: -1200px;
            opacity: 0;
          }
          to {
            left: 0;
            opacity: 1;
          }
        }
        @keyframes img-right-leave {
          from {
            left: 0;
            opacity: 1;
          }
          to {
            left: 1200px;
            opacity: 0;
          }
        }
      }
    }
    // 选择点区域
    .sliders-select {
      position: absolute;
      width: 100%;
      height: 30px;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      // 指示点样式
      .item {
        width: 10px;
        height: 10px;
        margin: 0 5px;
        border-radius: 100%;
        background-color: white;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        transition: .5s;
        &:hover {
          background-color: rgb(46, 224, 255);
        }
      }
      .item-active {
        background-color: rgb(255, 164, 46);
      }
    }
    //翻页按钮
    .sliders-bt {
      position: absolute;
      width: 40px;
      height: 80px;
      background-color: rgba(0, 0, 0, 0.2);
      top: 50%;
      transition: all .5s;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 40px;
      color: white;
      transform: translateY(-50%);
      &:hover {
        background-color: rgba(0, 0, 0, 0.4);
      }
      &:active {
        background-color: rgba(10, 10, 10, 0.3);
      }
      &.bt-left {
        left: -60px;
      }
      &.bt-right {
        right: -60px;
      }
      @media screen and( max-width: 1800px) {
        &.bt-left {
          left: 20px;
        }
        &.bt-right {
          right: 20px;
        }
      }
    }
  }
}
</style>
