<template>
  <div class="blog">
    <router-view/>
    <transition-group tag="div" name="blogList" class="blogList" v-if="!showArticle">
      <router-link v-if="articleNum>0" v-for="n in articleNum"
                   :key="n" :to="{name:'article',params:{id:'c19930903'+n}}"
                   class="blogItem" :style="{'transition-delay':n*0.2+'s'}">
        <div class="bg" :style="{background:`rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},1)`}"></div>
      </router-link>
    </transition-group>
  </div>
</template>

<script>
    export default {
        name: "blog",
      data(){
          return {
            showArticle:false,
            articleNum:0,
            articleList:[
              {color:``}
            ]
          }
      },
      mounted(){
        this.articleNum = 10;
      },
      watch:{
          $route(){
            this.showArticle = this.$route.name!=='blog';
          }
      }
    }
</script>

<style scoped lang="less">
.blog{
  height: 100%;
  position: relative;
  .blogList{
    display: flex;
    width: auto;
    position: absolute;
    bottom: 0;
    top: 0;
    .blogItem{
      display: inline-block;
      width: 320px;
      height: 100%;
      position: relative;
      .bg{
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
  .blogList-enter-active,.blogList-leave-active{
    transition: transform .5s;
  }
  .blogList-enter,.blogList-leave-to{
    transform: translateY(100vh);
  }

</style>
