import Mhr from "menhera";
import Mue from "../src";

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
