<script>
import { Sortable } from "@shopify/draggable";

export default {
  props: {
    value: { required: true },
    itemClass: { default: "sortable-item" },
    handleClass: { default: "sortable-handle" },
    listClass: { default: "" },
    notVModel: { default: false }
  },
  provide() {
    return {
      itemClass: this.itemClass,
      handleClass: this.handleClass
    };
  },
  mounted() {
    if (!(this.value instanceof Array) && !this.notVModel)
      console.error(`
You've assigned sortable list's \`v-model\` to a value which is not an array.
This will fail to work.
Instead you need to pass \`:notVModel="true"\` as a prop and replace \`v-model\` to \`value\` and handle \`@input\` yourself.
\`@input\` will receive only one argument.
      `);
    if (this.$slots.default.length !== 1)
      console.error(
        "All sortable components including this one accept exactly one root element in their (default) slot." +
          `You've passed ${
            this.$slots.default.length
          } root elements in the slot.`
      );
    new Sortable(
      this.listClass
        ? document.querySelectorAll(`.${this.listClass}`)
        : this.$el,
      {
        draggable: `.${this.itemClass}`,
        handle: `.${this.handleClass}`,
        mirror: {
          constrainDimensions: true
        }
      }
    ).on("sortable:stop", e => {
      if (this.notVModel) this.$emit("input", e);
      else
        this.$emit(
          "input",
          this.handleSorting(e.data.newIndex, e.data.oldIndex)
        );
    });
  },
  methods: {
    handleSorting(newIndex, oldIndex) {
      const newList = [...this.value];
      if (newIndex === oldIndex) return newList;
      const t = newList[oldIndex];
      newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, t);
      return newList;
    }
  },
  render() {
    return this.$slots.default[0];
  }
};
</script>
