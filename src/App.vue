<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div class="main" style="height: calc(100vh - 52px);">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader';

  export default {
    name: 'app',
    components: {
      AppHeader
    },
    created() {
      this.$Message.config({
        top: 200,
        duration: 3
      });
      this.$Notice.config({
        top: 80,
        duration: 4
      });
    }
  }
</script>

<style lang="less">
  @import 'http://at.alicdn.com/t/font_545903_3tctmwbnxrfnu3di.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .main {
      overflow-y: hidden;
      overflow-x: auto;
      width: 100vw;
      text-align: center;
    }
  }
/*transition-css-start*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /*transition-css-over*/

  /*loading-css-start*/
  .loader {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0 auto;
  }
  .circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes color {
    0%, 100% {
      stroke: #d62d20;
    }
    40% {
      stroke: #0057e7;
    }
    66% {
      stroke: #008744;
    }
    80%, 90% {
      stroke: #ffa700;
    }
  }
  /*loading-css-over*/
</style>
