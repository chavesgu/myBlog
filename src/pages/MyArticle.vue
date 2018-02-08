<template>
    <div class="article" :style="{background:bg,width:bgWidth+'%'}">
        <div class="word" :style="{transform:`translateY(${wordTop}vh)`}">
          <div class="container">

          </div>
          <router-link class="close" :to="{name:'blog'}" :style="{color:bg}">
            <i class="iconfont chaves-close1"></i>
          </router-link>
        </div>
    </div>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js'
  import '../assets/iscroll/iscroll'
    export default {
        name: "my-article",
      data(){
          return{
            bgWidth:0,
            wordTop:100,
            tweenOpen:null,
            tweenTop:null,
          }
      },
      computed:{
          bg(){
            return this.$store.state.articleBg
          }
      },
      created(){

      },
      mounted(){
        this.wordScroll = new IScroll('.article .word',{
          mouseWheel:true,
          mouseWheelSpeed:10,
          disableMouse:true
        });

        function animate() {
          requestAnimationFrame(animate);
          TWEEN.update();
        }
        animate();
        let _this = this;
        this.tweenOpen = new TWEEN.Tween(_this);
        this.tweenTop = new TWEEN.Tween(_this);
        this.tweenOpen.to({bgWidth:100},500).start().onComplete(function () {
          _this.tweenTop.to({wordTop:0},300).start().onComplete(function () {
            _this.tweenTop = null;
            _this.tweenOpen = null;
            _this.loadWord = true;
          })
        });
      }
    }
</script>

<style scoped lang="less">
  .article{
    height: 100%;
    display: inline-block;
    .word{
      width: 900px;
      height: 100%;
      background: #fff;
      margin: 0 auto;
      position: relative;
      .container{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 200vh;
      }
      a.close{
        position: absolute;
        width: 34px;
        height: 34px;
        top: 20px;
        right: 20px;
        i{
          font-size: 30px;
        }
      }
    }
  }
</style>
