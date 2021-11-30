<template>
  <div class="hot-card-container">
    <h1>热门讲师</h1>
    <div id="hot-teacher-card" class="card-container">
      <TeacherCard v-for="(item,index) in hotTeacher" :key="index" :entry-index="index" :teacher="item">
      </TeacherCard>
    </div>
    <div class="all-card">
      <router-link to="/teacher">全部教师</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotTeacher",
  props: ['hotTeacher'],
}
</script>

<style lang="scss" scoped>

</style>
