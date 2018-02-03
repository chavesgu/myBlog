import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:HelloWorld
    },
    {
      path:'/blog',
      name:'blog',
      component:()=>import('../pages/Blog.vue'),
    },
    {
      path:'/article/:id',
      name:'article',
      component:()=>import('../components/MyArticle.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: ()=>import('../pages/Contact.vue')
    },
    {
      path: '/admin/:userName',
      name:'admin',
      component: ()=>import('../pages/Admin.vue'),
      meta:{
        checkSign:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('../pages/Login.vue'),
      // meta:{
      //   checkSign:true
      // },
      children:[
        {
          path:'',
          redirect:'signIn'
        },
        {
          path: 'register',
          name: 'register',
          component: ()=>import(/* webpackChunkName: "login" */ '../pages/login/Register.vue')
        },
        {
          path: 'signIn',
          name: 'signIn',
          component: ()=>import(/* webpackChunkName: "login" */ '../pages/login/SignIn.vue')
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if (to.meta.checkSign){
    let signInfo = localStorage.admin?JSON.parse(localStorage.admin):null;
    if (signInfo) {
      let time = (new Date().getTime()) - signInfo.signTime;
      if (time / 1000 / 60 > 5) {//5分钟登录过期
        OneVue.$Modal.warning({
          title: 'Warning',
          content: '登录超时',
          onOk() {
            localStorage.removeItem('admin');
            next({name: 'signIn'});
          }
        });
        return
      }
    }
  }
  next();
});


// {
//     path:'coming',
//         name:'MovieComing',
//     component:function(resolve){
//     require.ensure([],function (require) {
//         resolve(require("../page/Movie/Coming.vue"))
//     },"MovieComing")
// }
// }
