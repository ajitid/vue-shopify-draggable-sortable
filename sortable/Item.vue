<script>
export default {
  inject: ["itemClass"],
  mounted() {
    if (this.$slots.default.length !== 1)
      console.error(
        "All sortable components including this one accept exactly one root element in their (default) slot." +
          `You've passed ${
            this.$slots.default.length
          } root elements in the slot.`
      );
    this.$el.classList.add(this.itemClass);
  },
  render() {
    return this.$slots.default[0];
  }
};
</script>
