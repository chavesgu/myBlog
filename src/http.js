import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'
import {router} from './router'
import store from './store'
import myCookie from '@/assets/utils/cookie'

Axios.defaults.withCredentials = true;
Axios.defaults.timeout = 20000;
Axios.defaults.transformRequest = [function(data) {
  return qs.stringify(data)//转换成form data格式
  // return data;
}];
//添加请求拦截器
Axios.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示
  store.commit('loadingStart');
  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
});
//添加响应拦截器
Axios.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉
  store.commit('loadingOver');
  return response
}, error => {
  //请求错误时做些事
  if (error.response.status===401){
    Vue.prototype.$alert(error.response.data.msg,{
      title:'Message',
      type:error.response.data.type,
      callback(){
        myCookie.removeItem('user');
        router.replace({name:'signIn'});
        console.clear();
      }
    });
  }
  store.commit('loadingOver');
  return Promise.reject(error)
});

Vue.prototype.$http = Axios;
