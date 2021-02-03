<template>
  <div id="app">
    <keep-alive include="Home,FenleiView">
      <router-view></router-view>
    </keep-alive>
    <tab-bar-main
      v-show="$route.path==='/home' ||$route.path==='/cart'||$route.path==='/categroy'||$route.path==='/profile'"
    ></tab-bar-main>
  </div>
</template>
<script>
import TabBarMain from "components/common/tabbar/TabBarMain";

export default {
  name: "App",
  components: {
    TabBarMain
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import "assets/css/base.css";
</style>
