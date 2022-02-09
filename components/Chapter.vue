<template>
  <div class="chapter">
    <el-collapse>
      <el-collapse-item v-for="chap in chapter" :key="chap.id">
        <template slot="title">
          <span class="video-title">{{chap.title}}</span>
        </template>

          <nuxt-link v-for="video in chap.children" :key="video.id" :to="`/course/${video.courseId}/play?p=${video.id}`">
            <div class="video ml4 pd4 mt2 bdr2" :class="current===video.id?'active':''">
              <fa :icon="['far', 'circle']"/>&emsp;<span v-if="video.isFree === true" class="icon-free">免费</span>&emsp;
              {{video.title}}
            </div>
          </nuxt-link>

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "Chapter",
  props: ["chapter","current"],
  data(){
    return{
    }
  },
  watch:{
  },
  methods:{
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/variables";
.chapter{
  .video{
    font-size: 16px;
    &:hover{
      cursor: pointer;
      background-color: $font-hover-green;
      color: white;
    }
    &.active{
      cursor: pointer;
      background-color: $background-hover;
      color: white;
    }
  }
}
</style>
