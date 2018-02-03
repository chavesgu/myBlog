<template>
    <div class="article">
      {{bg}}
    </div>
</template>

<script>
    export default {
        name: "my-article",
      data(){
          return{

          }
      },
      computed:{
          bg(){
            return this.$store.state.articleBg
          }
      }
    }
</script>

<style scoped lang="less">
  .article{
    height: 100%;
  }
</style>
