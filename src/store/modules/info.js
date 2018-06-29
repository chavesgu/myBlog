import myCookie from '@/assets/utils/cookie';
import axios from 'axios'
export const state = () => {
  return {
    test:123
  };
};
export const mutations = {

};
export const actions = {
  async getInfo({commit,rootGetters}){
    try {
      let {data} = await axios({
        method:"get",
        url:rootGetters.apiUrl+'/user/info'
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
  },
  async saveInfo({commit,rootGetters},{photo}){
    try {
      let {data} = await axios({
        method:"patch",
        url:rootGetters.apiUrl+'/user/info',
        data:{
          photo
        }
      });
      return data
    }catch (e) {
      Promise.reject(e);
    }
  }
};
