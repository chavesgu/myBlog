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
      component:function (resolve) {
        require.ensure([],function (require) {
          resolve(require('../pages/Blog.vue'))
        },'blog')
      },
      children:[
        {
          path:':id',
          name:'article',
          component:function (resolve) {
            require.ensure([],function (require) {
              resolve(require('../components/MyArticle'))
            },'article')
          }
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      component: function (resolve) {
        require.ensure([],function (require) {
          resolve(require('../pages/Contact.vue'))
        },'contact')
      }
    },
    {
      path: '/admin/:userName',
      name:'admin',
      component: function (resolve) {
        require.ensure([],function (require) {
          resolve(require('../pages/Admin.vue'))
        },'admin')
      },
      meta:{
        checkSign:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require.ensure([],function (require) {
          resolve(require('../pages/Login.vue'))
        },'login')
      },
      meta:{
        checkSign:true
      },
      children:[
        {
          path:'',
          redirect:'signIn'
        },
        {
          path: 'register',
          name: 'register',
          component: function (resolve) {
            require.ensure([],function (require) {
              resolve(require('../pages/login/register.vue'))
            },'register')
          }
        },
        {
          path: 'signIn',
          name: 'signIn',
          component: function (resolve) {
            require.ensure([],function (require) {
              resolve(require('../pages/login/SignIn.vue'))
            },'signIn')
          }
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
      if (time / 1000 / 60 > 5) {
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
