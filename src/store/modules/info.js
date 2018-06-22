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
  async qiniuToken({commit,rootGetters},file){
    try {
      let filename = myCookie.getItem('user')+'.jpg';
      let {data} = await axios(
        {
          method:"post",
          url:rootGetters.apiUrl+'/qiniu',
          data:{
            filename
          },
          headers:{
            "c-token":myCookie.getItem("c-token")
          }
        });
      return data;
    }catch (e) {
      Promise.reject(e);
    }

  }
};
