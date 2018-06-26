<template>
  <div class="layout">
    <AppHeader></AppHeader>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view/>
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
