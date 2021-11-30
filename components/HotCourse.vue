<template>
  <div class="hot-card-container">
    <h1>热门课程</h1>
    <div id="hot-course-card" class="card-container">
      <CourseCard v-for="(item,index) in hotCourse" :key="index" :entry-index="index" :course="item"/>
    </div>
    <div class="all-card">
      <router-link to="/course">全部课程</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotCourse",
  props: ['hotCourse']
}
</script>

<style lang="scss" scoped>

</style>
