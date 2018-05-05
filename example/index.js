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
    }
  }
});
