<template>
  
  <div class="tabbar_item" @click="itemClick">
    <div v-show="!isActive">
      <slot name="tab_icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="tab_icon_active"></slot>
    </div>
    <div :style="isActive?{color:$parent.item_active}:{}">
      <slot name="tab_text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",

  props: {
    // path:使用TabBarItem组件时手动添加path="/xxx",等于父传子，props接收
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive() {
      // active切换
      return this.$route.path.indexOf(this.path) != -1;
    }
  },
  methods: {
    itemClick() {
      //views切换
      this.$router.replace(this.path);
    }
  }
};
</script>

<style lang="less" scoped>
.tabbar_item {
  flex: 1;
  text-align: center;
  img {
    width: 32px;
    vertical-align: middle;
  }
}
</style>