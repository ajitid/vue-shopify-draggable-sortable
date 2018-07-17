# Vue 2 components for Shopify Draggable library's Sortable module

_TODO: examples, TOC, docs for handling complex objects, docs for dragging between multiple lists_

## Install

1. Dowload this repo and copy the components.

1. Use npm or yarn to install Shopify Draggable library.

```
npm install @shopify/draggable --save
```
```
yarn add @shopify/draggable
```

## Usage

Assuming that you are iterating over items array and you want to make these items sortable:

```html
<ul>
  <li v-for="item in items" :id="item.id">{{item.text}}</li>
</ul>
```

```js
export default {
  data() {
    return {
      items: [
        {id: 1, text: "Item 1"},
        {id: 2, text: "Item 2"},
        {id: 3, text: "Item 3"},
      ]
    };
  }
}
```

As `ul` is immediate parent of these items, these elements will be wrapped by in following manner:

```html
<sortable-list v-model="items">
  <ul>
    <sortable-item>
      <sortable-handle>
        <li v-for="item in items" :id="item.id">{{item.text}}</li>
      </sortable-handle>
    </sortable-item>
  </ul>
<sortable-list>
```

That's it! These items are now sortable.

> Nesting of components: List > Items > Handle

`sortable-handle` tells which part of `sortable-item` can be used to click and drag the item. In above code as `sortable-handle` is wrapped around each list item, the whole item becomes a handle.

> **Rules**
>1. Each sortable component accepts exactly one root element in their (default) scoped slot.
>1. Each sortable item should be _immediate_ child of its list container. More on this below.

```html
<sortable-list v-model="items">
  <ul>
    <div>
      <sortable-item>
        <sortable-handle>
          <li v-for="item in items" :id="item.id">{{item.text}}</li>
        </sortable-handle>
      </sortable-item>
    </div>
  </ul>
<sortable-list>
```

Above code will not work. `sortable-list` needs `sortable-item` immediately after its root element (in above code this is `ul`). If you need to keep that `div`, then this code needs to be changed to:

```html
<ul>
  <sortable-list v-model="items">
    <div>
      <sortable-item>
        <!-- rest of code inside remains same -->
      </sortable-item>
    </div>
  <sortable-list>
</ul>
```


### Handling complex objects

The `v-model` that you pass to `sortable-list` may not be a simple array. It can be a complex object like:

_[!!STAGNATED!!] Will add docs for complex usage soon_
