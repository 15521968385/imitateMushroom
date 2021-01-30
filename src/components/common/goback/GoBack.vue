<template>
  <div class="goback" @click="goBack">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GoBack",
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>