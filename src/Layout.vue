<template>
  <div class="layout">
    <keep-alive>
      <AppHeader></AppHeader>
    </keep-alive>
    <div class="main">
      <transition name="fade" mode="out-in">
        <keep-alive :include="['about','blog']">
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader';
  export default {
    name: "Layout",
    components: {
      AppHeader
    },
  }
</script>

<style scoped lang="scss">
.layout{
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main {
    overflow-y: hidden;
    overflow-x: auto;
    flex: 1;
    width: 100vw;
    text-align: center;
  }
}
</style>
