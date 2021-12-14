<template>
  <div class="teacher-card shadow-hover">
    <nuxt-link class="avatar-teacher" to="/"><img src="http://www.atguigu.com/teacher/new/tonggang.jpg" alt=""></nuxt-link>
    <div class="introduce">
      <h3><b><nuxt-link to="/">张老师</nuxt-link></b><span class="level">首席教师</span></h3>
      <div class="feature">
        <h3 class="title"><b>简&emsp;&emsp;介: </b></h3>
        <p>
          资深项目经理、技术讲师、SUN SCJP、SCWCD、原工信部移动云计算教育培训中心教学总监。
          十年软件开发经验：参与完成辽宁某高校远程教学管理系统、慧文信息门户系统、日本麦卡尔超市管理系统、
          崎玉市外来人口登记系统、深海视频会议管理系统、仙台市宫城县日常事务系统等项目的设计和开发。
          十年软件培训经验：曾在中国AOP全球外包排名第一的公司任Java、Oracle培训讲师、负责对公司员工新技术培训；
          曾任花旗银行特约JavaEE培训讲师；某部队研究所JavaEE培训；曾受聘为北航、厦门大学移动云计算专业教学主任，
          并主讲Java、Android、iOS课程。
        </p>
      </div>
      <div class="feature">
        <h3 class="title"><b>一&nbsp;&nbsp;句&nbsp;&nbsp;话:</b></h3>
        <p>
          资深项目经理、技术讲师
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherCard"
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables.scss";
.teacher-card{
  display: flex;
  width: 100%;
  height: 360px;
  .avatar-teacher{
    display: flex;
    align-items: center;
    padding: 16px 16px;
    img{
      height: 330px;
      width: 280px;
    }
  }
  .introduce{
    color: $font-normal;
    flex: 1;
    padding: 16px 16px;
    .level{
      margin-left: 30px;
      font-size: 16px;
    }
    .feature{
      margin-top: 16px;
      display: flex;
      title{
        width: 100px;
      }
      p{
        flex: 1;
        padding: 0 1em;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}
</style>
