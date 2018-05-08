## Install

```bash
$ yarn add menhera menhera-vue
```

## Example

```js
//index.js
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
    },
    beforeCreate() {
      this.$data.count++;
    },
    created() {
      this.$data.count++;
    },
    beforeMount() {
      this.$data.count++;
    },
    mounted() {
      this.$data.count++;
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
