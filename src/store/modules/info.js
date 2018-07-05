import myCookie from '@/assets/utils/cookie';
import axios from 'axios'
import Vue from 'vue'
export const state = () => {
  return {
    info:null
  };
};
export const mutations = {
  commitInfo(state,info){
    state.info = info;
  }
};
export const actions = {
  async getInfo({commit,rootGetters}){
    try {
      let {data} = await axios({
        method:"get",
        url:rootGetters.apiUrl+'/user/info'
      });
      if (data.code===200){
        commit('commitInfo',data.result)
      }else {
        Vue.prototype.$alert('获取用户信息失败',{
          title:'Message',
          type:'error'
        });
      }
      return data
    }catch (e) {
      Promise.reject(e);
    }
  },
  async saveInfo({commit,rootGetters},obj){
    try {
      let {data} = await axios({
        method:"patch",
        url:rootGetters.apiUrl+'/user/info',
        data:{
          ...obj
        }
      });
      return data
    }catch (e) {
      Promise.reject(e);
    }
  },
  async qiniuToken({commit,rootGetters},file){
    try {
      let filename = myCookie.getItem('user')+'.jpg';
      let {data} = await axios(
        {
          method:"post",
          url:rootGetters.apiUrl+'/user/qiniu',
          data:{
            filename
          }
        });
      return data;
    }catch (e) {
      Promise.reject(e);
    }
  }
};
