import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from "@/api/login";
import cookie from "js-cookie";

Vue.use(Vuex)

const store = ()=>new Vuex.Store({
  state:{
    userInfo: null,
  },
  mutations: {
    logoutUser(state){
      state.userInfo = null
    },
    getUserInfo(state,info){
      state.userInfo = info
    }
  },
  actions:{
    loginUser({commit},token){
      getUserInfo(token).then(res=>{
        commit('getUserInfo',res.data.userInfo)
      }).catch(err=>{
        commit('logoutUser')
        cookie.set('auth-token','')
      })
    }
  }
})

export default store
