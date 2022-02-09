<template>
  <div class="teacher-intro">
    <img class="avatar-size" :src="teacher.avatar" :alt="teacher.name">
    <span class="mt6">{{teacher.name}}</span>
    <span class="level mt6">{{teacher.level === 1 ?'高级讲师':'首席讲师'}}</span>
    <span class="intro mt6">{{teacher.career}}</span>
  </div>
</template>

<script>
export default {
  name: "TeacherIntro",
  props:['teacher']
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/variables";
.teacher-intro{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar-size{
    width: 200px;
    height: 200px;
  }
  .level{
    color: $font-hint;
  }
  .intro{
    color: $font-hint;
  }
}
</style>
