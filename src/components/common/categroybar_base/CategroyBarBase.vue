<template>
  <div class="categroybarbase" :style="{backgroundColor:bgc}">
    <div v-for="(item,index) in categroybases" :key="index" @click="baseClick(index)">
      <span :class="{active:index===activeIndex}">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategroyBarBase",
  data() {
    return {
      activeIndex: 0
    };
  },
  props: {
    categroybases: {
      type: Array,
      required: true
    },
    bgc: {
      type: String
    }
  },
  methods:{
    baseClick(index){
      this.activeIndex=index;
      this.$emit('baseClick',index)
    }
  }
};
</script>

<style lang="less" scoped>
.categroybarbase {
  
  display: flex;
  text-align: center;
  div {
    flex: 1;
    span {
      display: inline-block;
      padding: 5px;
    }
  }
}

.active {
  color: red;
  border-bottom: 2px solid red;
}
</style>