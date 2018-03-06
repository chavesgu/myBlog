import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    globalLoad:false,
    testData:1,
    articleBgList:[
      {bgColor:`#72616e`},
      {bgColor:`#e8846b`},
      {bgColor:`#16528e`},
      {bgColor:`#e54b4b`},
      {bgColor:`#a2c5bf`},
      {bgColor:`#167c80`},
      {bgColor:`#0082c8`}
    ]
  },
  mutations:{
    loadingStart(state){
      state.globalLoad = true;
      Vue.$Spin.show({
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
    loadingOver(state){
      if (state.globalLoad){
        Vue.$Spin.hide();
        state.globalLoad = false;
      }
    }
  },
  actions:{

  }
});
