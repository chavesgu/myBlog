import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    articleBg:'',
    testData:1
  },
  mutations:{
    loadingStart(){
      OneVue.$Spin.show({
        render:(h)=>{
          return h('div',{
            'class':'loader'
          },[
            h('svg',{
              'class':'circular',
              attrs:{
                viewBox:'25 25 50 50'
              }
            },[
              h('circle',{
                'class':'path',
                attrs:{
                  cx:'50',
                  cy:'50',
                  r:'20',
                  fill:'none',
                  'stroke-width':'5',
                  'stroke-miterlimit':'10',
                }
              })
            ])
          ])
        }
      });
    },
    loadingOver(){
      OneVue.$Spin.hide();
    }
  },
  actions:{

  }
});
