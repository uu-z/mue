import { $ } from "menhera";
import { data, methods } from "menhera-utils";

export default {
  name: "Mue",
  _hooks: {
    data,
    methods,
    Mue: {
      _({ _val }) {
        const { el, data, methods } = _val;
        if (typeof window !== "undefined") {
          this.$el = document.querySelector(el);
          this.$methods = methods;
          data && this._observe(data);
          this._compile(this.$el);
        }
      }
    }
  },
  data: {
    $el: {},
    $data: {},
    $methods: {},
    _binding: []
  },
  methods: {
    _updateWatch(watch) {
      const { el, attr, vm, exp } = watch;
      el[attr] = vm.$data[exp];
      return watch;
    },
    _observe(data) {
      $(data, (k, v) => {
        if (Reflect.has(data, k)) this._binding[k] = { _directives: [] };
        if (typeof v === "object") {
          this._observe(v);
        }
        const binding = this._binding[k];
        let _this = this;
        Reflect.defineProperty(this.$data, k, {
          enumerable: true,
          configurable: true,
          get() {
            return v;
          },
          set(nV) {
            if (v !== nV) {
              v = nV;
              binding._directives.forEach(watch => {
                _this._updateWatch(watch);
              });
            }
          }
        });
      });
    },
    _compile(root) {
      const nodes = root.children;
      $(nodes, (k, n) => {
        if (n.children.length) {
          this._compile(n);
        }
        let _this = this;
        let v_click = n.getAttribute("v-click");
        if (v_click) {
          n.onclick = this.$methods[v_click].bind(this.$data);
        }
        let v_model = n.getAttribute("v-model");
        if (v_model && (n.tagName == "INPUT" || n.tagName == "TEXTAREA")) {
          this._binding[v_model]._directives.push(
            this._updateWatch({
              name: "input",
              el: n,
              vm: this,
              exp: v_model,
              attr: "value"
            })
          );
          n.addEventListener("input", key => {
            this.$data[v_model] = n.value;
          });
        }
        let v_bind = n.getAttribute("v-bind");
        if (v_bind) {
          this._binding[v_bind]._directives.push(
            this._updateWatch({
              name: "text",
              el: n,
              vm: this,
              exp: v_bind,
              attr: "innerHTML"
            })
          );
        }
      });
    }
  }
};
