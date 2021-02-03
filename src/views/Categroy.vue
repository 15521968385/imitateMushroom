<template>
  <div class="categroy"></div>
</template>

<script>
export default {
  name: "Categroy",
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    console.log("categroy---beforeCreate");
  },
  created() {
    console.log("categroy---created");
  },
  beforeMount() {
    console.log("categroy---beforeMount");
  },
  mounted() {
    console.log("categroy---mounted");
  },
  beforeUpdate() {
    console.log("categroy---beforeUpdate");
  },
  updated() {
    console.log("categroy---updated");
  },
  beforeDestroy() {
    console.log("categroy---beforeDestroy");
  },
  destroyed() {
    console.log("categroy---destroyed");
  }
};
</script>

<style>
</style>