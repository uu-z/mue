## Install

```bash
$ yarn add menhera menhera-vue
```

## Example

```js
//index.js
import { $core } from "menhera";
import Mue from " menhera-vue";

new $core({}).$use({
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
    <button type="button" v-click="increment">increment</button>
    <p v-bind="count"></p>
  </div>
  <script src="./index.js"></script>
</body>
```

```bash
$ parcel index.html
```
