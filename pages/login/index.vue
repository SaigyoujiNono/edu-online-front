<template>
  <!-- 登录注册界面 -->
  <el-main id="app-container">
    <div class="login-box">
      <div class="form-box shadow-hover">
        <div class="select-form">
          <span @click="isLogin=true" :class="isLogin?'active':''">登录</span>
          <span @click="isLogin=false" :class="!isLogin?'active':''">注册</span>
        </div>
        <div v-if="isLogin" class="login-form">
          <div class="form-input">
            <label for="username">账号</label>
            <input id="username" type="text" v-model="loginForm.username" placeholder="请输入手机号/邮箱"/>
          </div>
          <div class="form-input">
            <label for="password">密码</label>
            <input id="password" type="password" v-model="loginForm.password" placeholder="请输入密码"/>
          </div>
        </div>
        <div v-if="!isLogin" class="login-form">
          <div class="form-input">
            <label for="username">邮箱</label>
            <input id="username" type="text" v-model="registerForm.username" placeholder="请输入邮箱"/>
          </div>
          <div class="form-input">
            <label for="password">密码</label>
            <input id="password" type="password" v-model="registerForm.password" placeholder="请输入密码"/>
          </div>
          <div class="form-input">
            <label for="rpassword">确认密码</label>
            <input id="rpassword" type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码"/>
          </div>
          <div class="form-input validate-input">
          <label for="validateCode">验证码</label><br/>
          <input id="validateCode" type="text" v-model="registerForm.validateCode" placeholder="输入验证码"/>
          <input @click="sendValid()" v-if="!isLogin" type="button" class="send-valid" :value="validTip"/>
        </div>
        </div>
        <div class="btn-container">
          <input v-if="isLogin" type="button" value="登录">
          <input v-if="!isLogin" type="button" value="注册">
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isLogin: true,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        validateCode: ''
      },
      validTimer: null,
      validTip:'发送验证码'
    }
  },
  methods: {
    //发送验证码
    sendValid(){
      if (this.validTimer === null){
        this.validTip = 60
        this.validTimer = setInterval(()=>{
          this.validTip--
          if (this.validTip<=0){
            clearInterval(this.validTimer)
            this.validTimer = null
          }
        },1000)
      }else{
        this.$notify.error('请稍稍再发送验证码')
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables.scss";
.login-box{
  width: 1200px;
  margin: 0 auto;
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box{
    width: 600px;
    border-radius: 10px;
    overflow: hidden;
    .select-form{
      cursor: pointer;
      display: flex;
      span{
        flex: 1;
        font-size: 24px;
        padding: 8px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &.active{
          background-color: $background-hover;
          color: $font-hover;
        }
      }
    }
    .login-form{
      display: flex;
      flex-direction: column;
      .form-input{
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        padding: 0 24px;
        font-size: 18px;
        label{
          font-size: 18px;
          margin-bottom: 8px;
          padding: 0 1em;
        }
        input{
          font-size: 18px;
          outline: none;
          border: 1px solid $border-category;
          padding: 0 1em;
          height: 2em;
          border-radius: 2em;
          &::placeholder{
            color: $font-hint;
          }
          &:focus{
            border: 1px solid $background-hover;
          }
        }
      }
      .validate-input{
        display: block;
        input[type=text]{
          width: 60%;
        }
        .send-valid{
          width: 30%;
          border: 2px solid $font-green;
          color: $font-green;
          &:hover{
            border: 2px solid $background-hover;
            color: $background-hover;
          }
        }
      }
    }
    .btn-container{
      margin: 18px 0;
      display: flex;
      justify-content: center;
      input[type=button]{
        font-size: 18px;
        border-radius: 8px;
        padding: 8px 16px;
        border: none;
        color: $font-hover;
        background-color: $background-theme;
        &:hover{
          background-color: $background-hover;
        }
      }
    }
  }
}
</style>
