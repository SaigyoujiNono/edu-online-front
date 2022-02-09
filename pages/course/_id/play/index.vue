<template>
  <el-main id="app-container">
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.18/skins/default/aliplayer-min.css" />
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.9.18/aliplayer-min.js"></script>
    <div class="content-container mt8">
      <el-card>
        <div slot="header">
          <span class="video-title">{{course.title}}</span>
        </div>
        <div class="video-container">
          <div class="prism-player" id="video_play"></div>
        </div>
      </el-card>

      <el-row class="mt8" :gutter="20">
        <el-col :span="16">
          <el-card>
            <el-tabs v-model:active-name="activeName">
              <el-tab-pane label="课程描述" name="description" v-html="course.description"></el-tab-pane>
              <el-tab-pane label="目录" name="chapter">
                <Chapter :current="current" :chapter="course.chapter"></Chapter>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <el-tabs :active-name="'teacher'">
              <el-tab-pane label="教师信息" name="teacher">
                <TeacherIntro :teacher="course.teacher"></TeacherIntro>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import {getCourseInfo} from "@/api/course";
import Chapter from "../../../../components/Chapter";
import {getCurrentVideoPlayAuth} from "../../../../api/course";

export default {
  name: "course_id",
  components: {Chapter},

  data(){
    return{
      activeName: 'description',
      videoAuth: '',
      playAliVideo: null
    }
  },
  watch:{
    // current(){
    //   const currentVideo = this.getCurrentVideo(this.course.chapter)
    //   console.log(currentVideo)
    //   getCurrentVideoPlayAuth(currentVideo.videoSourceId).then(res=>{
    //     this.playAliVideo = new Aliplayer({
    //       id:"video_play",
    //       width:'100%',
    //       height:'800px',
    //       autoplay: false,
    //       //根据视频凭证进行播放配置
    //       encryptType: '1',
    //       vid: this.current,
    //       playauth: res.data.auth
    //     },function (player){
    //
    //     })
    //   })
    // }
  },
  computed:{
    current(){
      const {p} = this.$route.query
      return p
    }
  },
  methods:{
    getCurrentVideo(courseChapter,current){
      let res
      const chap = courseChapter
      for (let i = 0; i < chap.length; i++) {
        if(chap[i]){
          const vis = chap[i].children
          for (let j = 0; j < vis.length; j++) {
            if(vis[j].id===current){
              return vis[j]
            }
          }
        }
      }
      // courseChapter.forEach(m=>{
      //   if (m.children) {
      //     m.children.forEach(n => {
      //       if (n.id===current){
      //         res = n
      //       }
      //     })
      //   }
      // })
      return res
    }
  },
  async mounted() {
    const cur = this.getCurrentVideo(this.course.chapter,this.current)
    const auth = await getCurrentVideoPlayAuth(cur.videoSourceId).then(res=>res.data.auth)
    if (auth){
      this.playAliVideo = new Aliplayer({
        id:"video_play",
        width:'100%',
        height:'800px',
        autoplay: false,
        //根据视频凭证进行播放配置
        encryptType: '1',
        vid: cur.videoSourceId,
        playauth: auth,
      },function (player){

      })
    }
  },
  async asyncData({route,redirect}){
    const {id} = route.params
    const {p} = route.query
    let course;
    await getCourseInfo(id).then(res=>{
      course = res.data.courseInfo
      if (p){

      }else {
        redirect("/course/"+id+"/play?p="+res.data.courseInfo.chapter[0].children[0].id)
      }
    }).catch(err=>{
      redirect('/404')
    })
    return {
      course
    }
  },
  async beforeRouteUpdate(to,from,next){
    const {p} = to.query
    const cur = this.getCurrentVideo(this.course.chapter,p)
    const auth = await getCurrentVideoPlayAuth(cur.videoSourceId).then(res=>res.data.auth)
    if (auth){
      if (this.playAliVideo !== null){
        this.playAliVideo.replayByVidAndPlayAuth(cur.videoSourceId,auth)
      }else{
        this.playAliVideo = new Aliplayer({
          id:"video_play",
          width:'100%',
          height:'800px',
          autoplay: false,
          //根据视频凭证进行播放配置
          encryptType: '1',
          vid: cur.videoSourceId,
          playauth: auth,
        },function (player){

        })
      }

    }
    next()
  },
}
</script>

<style lang="scss" scoped>

</style>
