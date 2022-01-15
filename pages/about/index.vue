<template>
  <el-main id="app-container">
    <div class="about-page content-container">
      <h2>这里是关于页面</h2>
    </div>
  </el-main>
</template>

<script>
export default {
  name: "index",
  head(){
    return{
      title: '关于',
      meta:[
        {name:'keywords',content:'在线视频教育系统,关于'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.about-page{
  margin: {
    top: 20px;
    bottom: 20px;
  };
}
</style>
