import { $core } from "menhera";
import Mue from "../src";

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
