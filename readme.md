## Install

```bash
$ yarn add menhera menhera-vue
```

## Example

```js
//index.js
import Mhr from "menhera";
import Mue from "menhera-vue";

new Mhr({
  _mount: {
    Mue
  },
  Mue: {
    el: "#app",
    data: {
      count: 0
    },
    methods: {
      increment() {
        this.count++;
      }
    }
  }
});
```

```html
// index.html
<body>
  <div id="app">
    <input type="text" v-model="count">
    <button type="button" @click="increment">increment</button>
    <p :val="count" :style="color:red"></p>
  </div>
  <script src="./index.js"></script>
</body>
```

```bash
$ parcel index.html
```
