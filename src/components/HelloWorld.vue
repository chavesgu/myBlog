<template>
  <div class="hello">
    http://52.187.146.95/

    <div class="test">
      {{testVuex}}
    </div>

    <pre class="language-js">
      <code>
        let num = 123;
        console.log(num);//123
      </code>
    </pre>

    <div class="botBeiAn"><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank">沪ICP备17017527号-1 </a></div>
    <div class="gov"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32092502000073" target="_blank"><img
      src="http://images.chavesgu.com/ghs.png" alt="">苏公网安备 32092502000073号</a></div>

    <select name="">
      <option value="">1</option>
      <option value="">1</option>
      <option value="">1</option>
      <option value="">1</option>
      <option value="">1</option>
    </select>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
export default {
  name: 'HelloWorld',
  metaInfo:{
    title:'Chaves Blog',
    titleTemplate:'%s - Hello',
    meta:[
      {name:'keywords',content:'hello word,vue blog,vue博客'}
    ]
  },
  data () {
    return {

    }
  },
  computed:{
    ...mapState({
      testVuex: state => state.testData
    })
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
