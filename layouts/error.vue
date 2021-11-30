<template>
  <div class="not-found">
    <h1>404...</h1>
    <h1>页面未找到</h1>
  </div>
</template>

<script>
export default {
  name: "error"
}
</script>

<style lang="scss" scoped>
//404页面
.not-found {
  margin: 15px auto;
  width: 1200px;
  height: 1000px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius:10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
