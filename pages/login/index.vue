<template>
  <!-- 登录注册界面 -->
  <div class="content-login-register">
    <div class="content-logo">
      <img src="https://vuejs.org/images/logo.svg" alt="">
      <h1>欢迎来到在线视频教育系统</h1>
    </div>
    <div class="content-form">
      <div class="form-box">
        <div id="input-container" class="input-container" :style="'left:' + (currentPanel ===0 ? '0':'-600px')">
          <div class="login">
            <h2>登录</h2>
            <form v-if="!wechat" id="user-login" action="/">
              <label for="username">
                <span>账号:</span>
                <input v-model="loginForm.username" type="text" id="username" name="username" placeholder="请输入邮箱/账号">
              </label>

              <label for="password">
                <span>密码:</span>
                <input type="password" v-model="loginForm.password" id="password" name="password" placeholder="请输入密码">
              </label>
            </form>
            <div v-if="wechat" id="wechat-login">
              <img src="https://pic.baike.soso.com/p/20090702/20090702093335-12585910.jpg" alt="">
            </div>
            <div class="other-login">
              <a id="user-btn" href="#" :class="wechat?'':'active'" @click="wechat=false">
                <i class="fa fa-user-circle-o"></i>
              </a>
              <a id="wechat-btn" href="#" :class="wechat?'active':''" @click="wechat=true">
                <i class="fa fa-wechat"></i>
              </a>
            </div>
          </div>
          <div class="register">
            <h2>注册</h2>
            <form action="/">
              <label for="rusername">
                <span>账号:</span>
                <input type="text" v-model="registerForm.username" id="rusername" name="username" placeholder="请输入邮箱">
              </label>

              <label for="rpassword">
                <span>密码:</span>
                <input type="password" v-model="registerForm.password" id="rpassword" name="password" placeholder="请输入密码">
              </label>
              <label for="confirm_rpassword">
                <span>再次确认密码:</span>
                <input type="password" v-model="registerForm.confirmPassword" id="confirm_rpassword" name="confirm_password" placeholder="请再次输入密码">
              </label>
              <label for="rvalid">
                <span>请输入验证码</span>
                <input type="text" v-model="registerForm.validateCode" id="rvalid" name="rvalid" placeholder="请输入验证码">
              </label>
              <div id="send-valid-btn" class="send-valid-btn" @click="sendValid(60)">
                {{countDown}}
              </div>
            </form>
          </div>
        </div>
        <div id="btn-container" class="btn-container">
          <a href="#" @click="select(0)">登录</a>
          <a href="#" @click="select(1)">注册</a>
          <div :style="'left:'+(currentPanel === 0 ? '185px':'300px')" id="btn-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      currentPanel: 0,
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
      wechat: false,
      countDown: '发送验证码',
      sendTimer: null //发送验证码的定时器
    }
  },
  methods: {
    select(position) {
      //如果和当前面板一致则为按钮功能
      if (position === this.currentPanel){
        position === 0 ? this.login():this.register()
      }
      this.currentPanel = position
    },
    //发送验证码
    sendValid(time){
      if (this.sendTimer){
        alert('当前不能发送验证码')
        return
      }
      this.countDown = time
      this.sendTimer = setInterval(()=>{
        time--
        this.countDown = time
        if (time <= 0){
          this.countDown= '发送验证码'
          clearInterval(this.sendTimer)
          this.sendTimer = null
        }
      },1000)
    },
    login(){
      console.log(this.loginForm)
    },
    register(){
      console.log(this.registerForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-login-register {
  position: relative;
  // height: 1000px;
  width: 80vw;
  min-width: 1200px;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-logo {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.7);
    >img {
      height: 300px;
      width: 300px;
    }
    &::after {
      content: "";
      position: absolute;
      height: 50%;
      width: 4px;
      background-color: rgba(0, 0, 0, 0.5);
      left: 50%;
      border-radius: 3px;
    }
  }
  .content-form {
    height: 100%;
    width: 50%;
    min-width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .form-box {
      position: relative;
      width: 600px;
      height: 800px;
      border-radius: 15px;
      background-color: white;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .input-container {
        position: relative;
        // right: 400px;
        height: 600px;
        width: 1200px;
        right: 0;
        // background: linear-gradient(#e66465, #9198e5);
        display: flex;
        transition: .5s;
        flex-direction: row;
        .login,
        .register {
          width: 50%;
          display: flex;
          position: relative;
          flex-direction: column;
          #wechat-login {
            overflow: hidden;
            height: 300px;
            transition: 3s;
            display: flex;
            justify-content: center;
            >img {
              height: 300px;
            }
          }
          #user-login {
            transition: 3s;
            display: flex;
          }
          h2 {
            font-size: 48px;
            margin-bottom: 40px;
            display: flex;
            justify-content: center;
            color: rgba(0, 0, 0, 0.7);
          }
          form {
            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            #rvalid {
              width: 350px;
            }
            //发送邮箱验证的按钮
            .send-valid-btn {
              box-sizing: border-box;
              border-radius: 15px;
              width: 100px;
              height: 50px;
              border: 3px solid rgb(144, 194, 252);
              position: absolute;
              display: flex;
              color: rgb(144, 194, 252);
              font-weight: 600;
              justify-content: center;
              align-items: center;
              right: 0;
              bottom: 0;
              cursor: pointer;
              &:hover {
                border: 3px solid rgb(89, 166, 255);
                color: rgb(89, 166, 255);
              }
            }
            label {
              display: flex;
              flex-direction: column;
              justify-content: center;
              color: rgba(0, 0, 0, 0.5);
              transition: .5s;
              &:focus-within {
                color: rgba(0, 0, 0, 0.8);
                input {
                  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
                }
              }
              span {
                font-weight: 600;
                font-size: 24px;
                margin-bottom: 10px;
                margin-top: 10px;
              }
              input {
                color: inherit;
                outline: none;
                font-size: 22px;
                background: none;
                border: none;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                &::-webkit-input-placeholder {
                  color: inherit;
                }
              }
            }
          }
          .other-login {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 50px;
            color: rgba(0, 0, 0, 0.5);
            bottom: 0;
            width: 100%;
            height: 100px;
            // background-color: rgba(0, 0, 0, 0.5)
            a {
              color: inherit;
              margin-right: 15px;
              transition: .5s;
            }
            a.active {
              color: rgba(138, 255, 4, 0.5);
            }
          }
        }
        .register {
          width: 50%;
        }
      }
      .btn-container {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        bottom: 170px;
        width: 100%;
        // background: linear-gradient(#e66465, #9198e5);
        a {
          text-decoration: none;
          color: rgba(0, 0, 0, 0.7);
          font-size: 18px;
          font-weight: 600;
          margin-right: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          // background: linear-gradient(#e66465, #9198e5);
          border-radius: 18px;
          width: 100px;
          height: 50px;
          z-index: 1;
        }
        #btn-border {
          position: absolute;
          width: 100px;
          height: 50px;
          left: 185px; //185px;
          border-radius: 18px;
          transition: .5s;
          z-index: 0;
          background: linear-gradient(#e66465, #9198e5);
        }
      }
    }
  }
}
</style>
