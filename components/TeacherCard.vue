<template>
  <div class="teacher-card shadow-hover">
    <nuxt-link class="avatar-teacher" to="/"><img :src="teacher.avatar" alt=""></nuxt-link>
    <div class="introduce">
      <h3><b><nuxt-link to="/">{{teacher.name}}</nuxt-link></b><span class="level">{{teacher.level === 1 ?'高级讲师':'首席讲师'}}</span></h3>
      <div class="feature">
        <h3 class="title"><b>简&emsp;&emsp;介: </b></h3>
        <p>
          {{teacher.intro}}
        </p>
      </div>
      <div class="feature">
        <h3 class="title"><b>一&nbsp;&nbsp;句&nbsp;&nbsp;话:</b></h3>
        <p>
          {{teacher.career}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherCard",
  props:['teacher']
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/variables.scss";
.teacher-card{
  display: flex;
  width: 100%;
  min-height: 360px;
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
