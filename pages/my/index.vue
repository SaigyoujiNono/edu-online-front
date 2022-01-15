<template>
  <el-main id="app-container">
    <div class="content-container user-info-container shadow-hover">
      <el-button @click="changeForm(0)" type="primary">修改个人信息</el-button>
      <el-form :disabled="!(disabledForm===0)" :model="userInfo" :rules="rules" ref="infoForm" label-width="100px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="用户名" prop="nickname" >
              <el-input type="text" v-model="userInfo.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" >
              <el-input type="text" v-model="userInfo.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="userInfo.sex">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age" >
              <el-input type="text" v-model="userInfo.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="sign" >
              <el-input type="text" v-model="userInfo.sign" maxlength="100" show-word-limit autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar" >
              <el-upload
                class="avatar-uploader"
                action="/api/oss/file/imgUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('infoForm')">立即修改</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button @click="changeForm(1)" type="primary">修改邮箱</el-button>
      <el-form :disabled="!(disabledForm===1)" :model="userInfo" :rules="rules" ref="emailForm" label-width="100px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="邮箱" prop="email" >
              <el-input type="text" v-model="userInfo.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item  label="验证码">
              <el-input type="text" v-model="validateCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button>发送验证码</el-button>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('emailForm')">立即修改</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="changeForm(2)" type="primary">修改密码</el-button>
      <el-form :disabled="!(disabledForm===2)" :model="userPwd" :rules="rules" ref="pwdForm" label-width="100px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="旧密码" prop="originPwd" >
              <el-input type="text" v-model="userPwd.originPwd" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="新密码" prop="newPwd" >
              <el-input type="text" v-model="userPwd.newPwd" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="确认密码" prop="confirmPwd" >
              <el-input type="text" v-model="userPwd.confirmPwd" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('pwdForm')">立即修改</el-button>
        </el-form-item>
      </el-form>
      {{userInfo}}
    </div>
  </el-main>
</template>

<script>
import cookie from "js-cookie";
import {getUserInfo} from "@/api/login";

export default {
  name: "index.vue",
  head(){
    return this.$seo('个人信息', '个人信息页')
  },
  methods:{
    handleAvatarSuccess(res, file) {
      if (res.status && res.status !== 200) {
        this.$notify.error('上传失败，请稍后再试')
        return
      }
      this.userInfo.avatar = res.data.url
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //更改需要修改的地方
    changeForm(formId){
      this.disabledForm = formId
    },
  },
  data(){
    const userPwd={
      originPwd: '',
        newPwd: '',
        confirmPwd: ''
    }
    const checkPwd = function(rule, value, callback){
      if (value === userPwd.newPwd){
        callback()
      }else{
        callback(new Error('两次密码不一致'))
      }
    };
    return {
      disabledForm: null,
      userInfo: {
        nickname: '',
        mobile: '',
      },
      userPwd,
      validateCode: '',
      rules:{
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {min:3,max:50,message: '长度限制在3到50个字',trigger: 'blur'}
        ],
        mobile: [
          {pattern: '0?(13|14|15|17|18|19)[0-9]{9}',message: '手机号格式不正确',trigger: 'blur'}
        ],
        sign:[
          {min:0,max:100,message: '长度限制在0到100个字',trigger: 'blur'}
        ],
        email:[
          {pattern: '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}',message: '邮箱格式不正确',trigger: 'blur'}
        ],
        originPwd: [
          { required: true, message: '请输入旧的密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新的密码', trigger: 'blur' },
          {pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$',message: '密码必须大写、小写、数字同时存在',trigger: 'blur'}
        ],
        confirmPwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPwd,message: '两次密码输入不一致',trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    const token = cookie.get('auth-token')
    if (token && token !== ''){
      getUserInfo(token).then(res=>{
        this.userInfo = res.data.userInfo
      }).catch(err=>{
        this.$notify.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-container{
  margin: {
    top: 20px;
    bottom: 20px;
  };
  padding: {
    top: 16px;
    bottom: 16px;
    left: 16px;
    right: 16px;
  };
  border-radius: 8px;
  .avatar{
    height: 200px;
    width: 200px;
  }
}
</style>
