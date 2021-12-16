import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo} from "@/api/login";
import cookie from "js-cookie";

Vue.use(Vuex)

const store = ()=>new Vuex.Store({
  state:{
    userToken: null,
    userInfo: null,
  },
  mutations: {
    loginUser(state,token){
      state.userToken = token
    },
    logoutUser(state){
      state.userToken = null
      state.userInfo = null
    },
    getUserInfo(state,info){
      state.userInfo = info
    }
  },
  actions:{
    loginUser({commit},token){
      console.log('登录')
      commit('loginUser',token)
      getUserInfo(token).then(res=>{
        commit('getUserInfo',res.data.userInfo)
      }).catch(err=>{
        commit('logoutUser',token)
        cookie.set('auth-token','')
      })
    }
  }
})

export default store
