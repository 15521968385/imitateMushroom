<template>
  <tab-bar item_active="white" bgc='pink'>
    <template>
      <tab-bar-item path="/home">
        <template #tab_icon>
          <img src="~assets/img/tabbar/home.png" alt />
        </template>
        <template #tab_icon_active>
          <img src="~assets/img/tabbar/home_active.png" alt />
        </template>
        <template #tab_text>
          <p>首页</p>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/categroy">
        <template #tab_icon>
          <img src="~assets/img/tabbar/categroy.png" alt />
        </template>
        <template #tab_icon_active>
          <img src="~assets/img/tabbar/categroy_active.png" alt />
        </template>
        <template #tab_text>
          <p>分类</p>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template #tab_icon>
          <img src="~assets/img/tabbar/cart.png" alt />
        </template>
        <template #tab_icon_active>
          <img src="~assets/img/tabbar/cart_active.png" alt />
        </template>
        <template #tab_text>
          <p>购物车</p>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template #tab_icon>
          <img src="~assets/img/tabbar/profile.png" alt />
        </template>
        <template #tab_icon_active>
          <img src="~assets/img/tabbar/profile_active.png" alt />
        </template>
        <template #tab_text>
          <p>我的</p>
        </template>
      </tab-bar-item>
    </template>
  </tab-bar>
</template>

<script>
import TabBar from "./TabBar";
import TabBarItem from "./TabBarItem";
export default {
  name: "TabBarMain",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>