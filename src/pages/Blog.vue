<template>
  <div class="blog">
    <transition-group tag="div" name="blogList" class="blogList">
      <router-link v-if="articleList.length" v-for="(item,index) in articleList"
                   :key="index" :to="{name:'article',params:{id:item}}"
                   class="blogItem">
        <div class="bg" :style="{background:articleBgList[index%articleBgList.length]}">
          <div class="content">

          </div>
        </div>
      </router-link>
    </transition-group>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "blog",
      metaInfo:{
        titleTemplate:'%s - blog'
      },
      data(){
          return {
            articleList:[]
          }
      },
      computed:{
        ...mapState({
          articleBgList:'articleBgList'
        })
      },
      created(){

      },
      mounted(){
        this.articleList = this.$store.state.articleList;
      },
      methods:{

      }
    }
</script>

<style scoped lang="scss">
.blog{
  height: 100%;
  position: relative;
  .blogList{
    width: auto;
    height: 100%;
    white-space:nowrap;
    @for $i from 1 through 10{
      .blogItem:nth-child(#{$i}){
        transition-delay: #{$i*0.2}s;
      }
    }
    .blogItem{
      display: inline-block;
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
        .content{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
  .blogList-enter-active{
    transition: transform .5s;
  }
  .blogList-enter{
    -webkit-transform: translateY(100vh);
    -ms-transform: translateY(-100vh);
    -moz-transform: translateY(-100vh);
  }
</style>
