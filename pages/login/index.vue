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
            <label for="email">邮箱</label>
            <input id="email" type="text" v-model="registerForm.email" placeholder="请输入邮箱"/>
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
          <el-button @click="loginHandler()" v-if="isLogin" :loading="btnLoading" class="btn-handler" type="button">登录</el-button>
          <el-button v-if="isLogin" class="btn-handler" type="button">
            <fa :icon="['fab', 'weixin']" />
          </el-button>
          <el-button @click="registerHandler()" v-if="!isLogin" :loading="btnLoading" class="btn-handler" type="button" >注册</el-button>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import {getUserInfo, login, register, sendValid} from "@/api/login";
import cookie from 'js-cookie'
export default {
  name: "index",
  data() {
    return {
      btnLoading:false,
      isLogin: true,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        email: '',
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
      if (this.registerForm.email === '' || !new RegExp("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?").exec(this.registerForm.email)){
        this.$notify.error('请输入邮箱或者邮箱格式不正确')
        return
      }
      if (this.validTimer === null){
        sendValid(this.registerForm.email).then(res=>{
          this.validTip = 60
          this.validTimer = setInterval(()=>{
            this.validTip--
            if (this.validTip<=0){
              clearInterval(this.validTimer)
              this.validTimer = null
            }
          },1000)
        }).catch(err=>{
          this.$notify.error(err)
        })
      }else{
        this.$notify.error('请稍稍再发送验证码')
      }
    },
    //登录
    loginHandler(){
      const {username,password}= this.loginForm
      if (username === '' || password === ''){
        this.$notify.error('请输入账户和密码')
        return
      }
      this.btnLoading = true
      login(this.loginForm).then(res=>{
        cookie.set('auth-token',res.data.token)
        this.$store.dispatch('loginUser',res.data.token)
        this.$notify.info('登录成功')
        this.$router.push('/')
      }).catch(err=>{
        this.$notify.error(err)
      }).finally(()=>{
        this.btnLoading = false
      })
    },
    //注册
    registerHandler(){
      const {email,password,confirmPassword,validateCode}= this.registerForm
      if (email === '' || password === '' || confirmPassword === '' || validateCode ===''){
        this.$notify.error('请输入账户、密码以及验证码')
        return
      }
      this.btnLoading = true
      register(this.registerForm).then(res=>{
        cookie.set('auth-token',res.data.token)
        this.$store.dispatch('loginUser',res.data.token)
        this.$notify.info('注册成功')
        this.$router.push('/')
      }).catch(err=>{
        this.$notify.error(err)
      }).finally(()=>{
        this.btnLoading = false
      })
    }
  },
  mounted() {
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      const token = cookie.get('auth-token')
      if (token || token !== ''){
        getUserInfo(token).then(res=>{
          vm.$router.push('/')
        }).catch(err=>{
          console.log('登录失效')
        })
      }
    })
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
      .btn-handler{
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
