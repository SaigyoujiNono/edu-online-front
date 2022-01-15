import Vue from "vue";

Vue.mixin({
  methods:{
    $seo(title,content,payload = []){
      return {
        title:title?title+'-在线教育':'在线教育',
        meta:[
          {hid:'description', name:'keywords',content}
        ].concat(payload),
      }
    }
  }
})
