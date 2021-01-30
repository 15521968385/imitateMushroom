import GoTop from "components/common/gotop/GoTop";
export const goTop = {
  components: {
    GoTop
  },
  data() {
    return {
      isTop: false,
    }
  },
  methods: {
    goTop() {
      this.$refs.scroll && this.$refs.scroll.go(0, 0);
    },
    showTop(y, ys) {
      this.isTop = y <= ys
    }
  }
}