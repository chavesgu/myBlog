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
      component:()=>import('../pages/MyArticle.vue')
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
    },
    {
      path: '/login',
      name: 'login',
      redirect:{name:'signIn'},
      component: ()=>import('../pages/Login.vue'),
      children:[
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
  ],
  scrollBehavior:(to,from,savedPosition)=>{
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {};
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0;
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }
});
router.beforeEach((to, from, next)=>{
  if (to.meta.checkSign){
    if (!localStorage.signId){
      OneVue.$Modal.warning({
        title: 'Warning',
        content: '登录信息错误',
        onOk() {
          next({name: 'signIn'});
        }
      });
    }else {
      let signId = localStorage.signId;
      OneVue.$http.post('http://admin.chavesgu.com/loginStatus.php',{signId:signId}).then(res=>{
        if (res.data){
          OneVue.$Modal.warning({
            title: 'Warning',
            content: '登录超时',
            onOk() {
              localStorage.removeItem('signId');
              localStorage.removeItem('signUser');
              next({name: 'signIn'});
            }
          });
        }else {
          next();
        }
      },error=>{
        console.log(error);
        localStorage.removeItem('signId');
        localStorage.removeItem('signUser');
        OneVue.$Modal.warning({
          title: 'Warning',
          content: '登录信息错误',
          onOk() {
            next({name: 'signIn'});
          }
        });
      })
    }
  }else {
    next();
  }
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
