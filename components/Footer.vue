<template>
  <el-footer height="fit-content" class="footer">
    <div class="footer-container">
      <div class="footer-title">
        <div class="title">
          <fa class="" :icon="['fas', 'users']" />
          <span>业界大牛亲自授课</span>
        </div>
        <div class="title">
          <fa class="" :icon="['fas', 'users']" />
          <span>前沿技术实时更新</span>
        </div>
        <div class="title">
          <fa class="" :icon="['fas', 'users']" />
          <span>足不出户学编程</span>
        </div>
      </div>
      <div class="footer-content">
        <div class="info">
          <span>新手入门</span>
          <nuxt-link to="/">新用户注册</nuxt-link>
          <nuxt-link to="/">用户登录</nuxt-link>
          <nuxt-link to="/">找回密码</nuxt-link>
        </div>
        <div class="info">
          <span>关于我们</span>
          <nuxt-link to="/">名师团队</nuxt-link>
          <nuxt-link to="/">视频下载</nuxt-link>
          <nuxt-link to="/">合作企业</nuxt-link>
        </div>
        <div class="info">
          <span>资源下载</span>
          <nuxt-link to="/">视频下载</nuxt-link>
          <nuxt-link to="/">资料下载</nuxt-link>
          <nuxt-link to="/">工具下载</nuxt-link>
        </div>
        <div class="info">
          <span>联系我们</span>
          <nuxt-link to="/">工作机会</nuxt-link>
          <nuxt-link to="/">招贤纳师</nuxt-link>
          <nuxt-link to="/">联系方式</nuxt-link>
        </div>
        <div class="info">
          <img src="@/static/qrcode.png" alt="">
          <p>扫码跳转到<a href="https://github.com/SaigyoujiNono" target="_blank">github</a></p>
        </div>
      </div>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables.scss';
.footer{
  background-color: $background-footer;
  position: relative;
  .footer-container{
    color: $font-white;
    width: 1200px;
    height: 100%;
    padding: 15px 0;
    margin: 0 auto;
    .footer-title{
      padding: 20px 0;
      display: flex;
      font-size: 24px;
      position: relative;
      .title{
        display: flex;
        justify-content: center;
        flex: 1;
      }
      &::after{
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: $background-gap;
      }
    }
    .footer-content{
      padding: 15px 0;
      display: flex;
      .info{
        flex: 1;
        display: flex;
        flex-direction: column;
        span{
          font-size: 20px;
          color: $font-small-title;
        }
        a{
          font-size: 14px;
          padding: 8px 0;
          color: $font-hint;
          transition: all 0.5s;
          &:hover{
            color:$font-hover-green;
          }
        }
        img{
          width: 120px;
          height: 120px;
        }
        p{
          color: $font-hint;
          font-size: 14px;
        }
      }
    }
  }
  &::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    background-color: $background-theme;
  }
}
</style>
