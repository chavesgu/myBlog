import Vue from 'vue'
import axios from 'axios'
export const state = () => {
  return {

  };
};

export const mutations = {

};

export const actions = {
  async oldChangePass({commit,rootGetters},params){
    try {
      let {data} = await axios({
        method:'patch',
        url:rootGetters.apiUrl+'/user/oldChangePass',
        data:params
      });

      Vue.prototype.$alert(data.msg,{
        type:data.code===200?'success':'error',
        title:'Message'
      });
    }catch (e) {
      Vue.prototype.$alert('修改失败',{
        type:'error',
        title:'Message'
      });
      Promise.reject(e)
    }
  },
  async phoneChangePassCode({commit,rootGetters}){
    try {
      let {data} = await axios({
        method:'post',
        url:rootGetters.apiUrl+'/user/changePassPhoneCode'
      });
      if (data.result){
        Vue.prototype.$alert(data.errmsg,{
          title: 'Message',
          type: 'error'
        });
      }else {
        Vue.prototype.$alert('send success',{
          title: 'Message',
          type: 'success'
        });
      }
    }catch (e) {
      Vue.prototype.$alert('send fail',{
        type:'error',
        title:'Message'
      });
      Promise.reject(e)
    }
  },
  async emailChangePassCode({commit,rootGetters}){
    try {
      let {data} = await axios({
        method:'post',
        url:rootGetters.apiUrl+'/user/changePassEmailCode'
      });
      Vue.prototype.$alert(data.msg,{
        title: 'Message',
        type: data.type
      });
    }catch (e) {
      Vue.prototype.$alert('send fail',{
        type:'error',
        title:'Message'
      });
      Promise.reject(e)
    }
  },
  async phoneChangePass({commit,rootGetters},params){
    try {
      let {data} = await axios({
        method:'patch',
        url:rootGetters.apiUrl+'/user/phoneChangePass',
        data:params
      });
      Vue.prototype.$alert(data.msg,{
        title:'Message',
        type:data.type
      })
    }catch (e) {
      Vue.prototype.$alert('修改失败',{
        title:'Message',
        type:'error'
      });
      Promise.reject(e)
    }
  }
};
