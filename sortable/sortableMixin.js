function getNestedValue(c, path) {
  let d = c;
  for (let i of path.split(".")) {
    d = d[i];
  }
  return d;
}

const mixin = {
  methods: {
    // nv -> nested value path
    handleSortableSorting(e, stateName, nvpListId, nvpList, dataAttr) {
      const { newContainer, oldContainer, newIndex, oldIndex } = e.data;
      if (newContainer === oldContainer) {
        if (newIndex === oldIndex) return;
        const listDataAttrId = newContainer.dataset[dataAttr];
        const listIndex = this[stateName].findIndex(
          x => getNestedValue(x, nvpListId) == listDataAttrId
        );

        const pre = this[stateName][listIndex];
        const list = getNestedValue(pre, nvpList);
        const t = list[oldIndex];
        list.splice(oldIndex, 1);
        list.splice(newIndex, 0, t);
      } else {
        const oldListDataAttrId = oldContainer.dataset[dataAttr];
        const newListDataAttrId = newContainer.dataset[dataAttr];
        const oldListIndex = this[stateName].findIndex(
          x => getNestedValue(x, nvpListId) == oldListDataAttrId
        );
        const newListIndex = this[stateName].findIndex(
          x => getNestedValue(x, nvpListId) == newListDataAttrId
        );

        const oldPre = this[stateName][oldListIndex];
        const oldList = getNestedValue(oldPre, nvpList);
        const newPre = this[stateName][newListIndex];
        const newList = getNestedValue(newPre, nvpList);

        const t = oldList[oldIndex];
        oldList.splice(oldIndex, 1);
        newList.splice(newIndex, 0, t);
      }
    }
  }
};

export default mixin;
