<template>
  <div class="hello">
    <h2>{{testVuex}}</h2>

    <table>
      <tr>
        <td rowspan="2">标题</td>
        <td colspan="5">标题</td>
        <td rowspan="2" colspan="5">标题</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>标题1</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
      </tr>
    </table>

    <div class="botBeiAn"><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank">沪ICP备17017527号-1 </a></div>
    <div class="gov"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32092502000073" target="_blank"><img
      src="http://images.chavesgu.com/ghs.png" alt="">苏公网安备 32092502000073号</a></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
export default {
  name: 'HelloWorld',
  metaInfo:{
    titleTemplate:'%s - Hello'
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
  mounted(){

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  td{
    border:1px solid #000;
    padding: 10px;
  }
</style>
