<template>
  <div class="user_main">
    <categroy-bar bgc="white">
      <template>
        <categroy-bar-item v-for="(item,index) in main.base" :key="index">
          <template #img>
            <img :src="item.icon" alt />
          </template>
          <template #text>
            <p>{{item.title}}</p>
          </template>
        </categroy-bar-item>
      </template>
    </categroy-bar>
    <div class="dingdan">
      <van-cell is-link>我的订单</van-cell>
      <categroy-bar bgc="white">
        <template>
          <categroy-bar-item v-for="(item,index) in main.dingdan" :key="index">
            <template #img>
              <img :src="item.icon" alt />
            </template>
            <template #text>
              <p>{{item.title}}</p>
            </template>
          </categroy-bar-item>
        </template>
      </categroy-bar>
    </div>
    <div class="myset">
      <van-cell is-link>我的设置</van-cell>
      <categroy-bar bgc="white">
        <template>
          <categroy-bar-item v-for="(item,index) in main.mySet" :key="index">
            <template #img>
              <img :src="item.icon" alt />
            </template>
            <template #text>
              <p>{{item.title}}</p>
            </template>
          </categroy-bar-item>
        </template>
      </categroy-bar>
    </div>
  </div>
</template>

<script>
import CategroyBar from "components/common/categroybar/CategroyBar";
import CategroyBarItem from "components/common/categroybar/CategroyBarItem";
export default {
  name: "UserMain",
  props: {
    main: {
      type: Object
    }
  },
  components: {
    CategroyBar,
    CategroyBarItem
  }
};
</script>

<style lang="less" scoped>
.user_main {
  margin-top: 10px;
  p {
    font-size: 12px;
    color: #5e5e5e;
  }

  img {
    width: 24px;
  }
}
.categroybar{
  border:none;
  padding: 5px;
}
.van-cell{
  padding: 5px;
}

</style>