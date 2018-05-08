import { $, $set, $get } from "menhera";
import { data, methods, lifeCycle } from "menhera-utils";

const matchColon = /\:/;
const matchAt = /\@/;

export default {
  name: "Mue",
  _hooks: {
    data,
    methods,
    Mue: {
      _({ _, _val }) {
        const { el, data, methods, directives } = _val;
        data && this._observe(data);
        methods && (this.$methods = methods);
        directives &&
          $(directives, (k, d) => {
            this.$directives[k] = d.bind(this);
          });

        if (typeof window !== "undefined" && el) {
          this.$el = document.querySelector(el);
          this._compile(this.$el);
          this._runLifeCycle(_val);
        }
      }
    }
  },
  data: {
    $lifeCycle: ["beforeCreate", "created", "beforeMount", "mounted"],
    $el: {},
    $data: {},
    $methods: {},
    $directives: {},
    _binding: []
  },
  methods: {
    _runLifeCycle(_val) {
      const lc = this.$lifeCycle;
      $(lc, (key, val) => {
        let fn = _val[val];
        if (fn) {
          fn.bind(this)();
        }
      });
    },
    _updateWatch(watch) {
      const { el, attr, vm, exp } = watch;
      let val = vm.$data[exp] === undefined ? exp : vm.$data[exp];

      $set(el, {
        [attr]: val
      });
      return watch;
    },
    _addDirecitves(key, watch) {
      if (!this._binding[key]) this._binding[key] = { _directives: [] };
      this._binding[key]._directives.push(watch);
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
        $(this.$directives, (k, d) => {
          d({ n });
        });
      });
    }
  },
  Mue: {
    directives: {
      on({ n }) {
        let attrs = n.getAttributeNames();

        attrs.forEach(attr => {
          let v_on = n.getAttribute(attr);
          if (matchAt.test(attr)) {
            attr = attr.replace(matchAt, "");
            n[`on${attr}`] = this.$methods[v_on].bind(this.$data);
          }
        });
      },
      model({ n }) {
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
      },
      bind({ n }) {
        let attrs = n.getAttributeNames();
        attrs.forEach(attr => {
          let v_bind = n.getAttribute(attr);

          if (matchColon.test(attr)) {
            attr = attr.replace(matchColon, "");

            if (attr === "val" || attr === "value") {
              attr = "innerHTML";
            }

            this._addDirecitves(
              v_bind,
              this._updateWatch({
                name: "text",
                el: n,
                vm: this,
                exp: v_bind,
                attr
              })
            );
          }
        });
        let v_bind = n.getAttribute("v-bind");
        if (v_bind) {
          this._addDirecitves(
            v_bind,
            this._updateWatch({
              name: "text",
              el: n,
              vm: this,
              exp: v_bind,
              attr: "innerHTML"
            })
          );
        }
      }
    }
  }
};
