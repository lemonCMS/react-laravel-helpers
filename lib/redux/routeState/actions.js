(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./constants"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./constants"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.constants);
    global.actions = mod.exports;
  }
})(this, function (_exports, _constants) {
  "use strict";

  _exports.__esModule = true;
  _exports.storeState = storeState;

  function storeState(route, state) {
    return {
      type: _constants.ROUTER_STORE_STATE,
      route: route,
      state: state
    };
  }
});