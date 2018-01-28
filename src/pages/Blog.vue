<template>
  <div class="blog">
    <router-view/>
    <transition-group tag="div" name="blogList" class="blogList" v-if="!showArticle">
      <router-link v-if="articleNum>0" v-for="n in articleNum"
                   :key="n" :to="{name:'article',params:{id:'c19930903'+n}}"
                   class="blogItem" :style="{'transition-delay':n*0.2+'s'}">
        <div class="bg" :style="{background:articleList[(n-1)%articleList.length].bgColor}"></div>
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
              {bgColor:`#72616e`},
              {bgColor:`#e8846b`},
              {bgColor:`#16528e`},
              {bgColor:`#e54b4b`},
              {bgColor:`#a2c5bf`},
              {bgColor:`#167c80`},
              {bgColor:`#0082c8`}
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
      display: block;
      width: 320px;
      height: 100%;
      position: relative;
      .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        transition: box-shadow .6s;
        &:hover{
          z-index: 5;
          box-shadow: 0 0 30px 5px rgba(0,0,0,0.7);
          transition: box-shadow .6s;
        }
      }
    }
  }
}
  .blogList-enter-active{
    transition: transform .5s;
  }
  .blogList-enter{
    transform: translateY(100vh);
  }

</style>
