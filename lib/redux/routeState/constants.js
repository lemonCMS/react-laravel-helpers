(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.ROUTER_STORE_STATE = void 0;
  var ROUTER_STORE_STATE = 'ROUTER_STORE_STATE';
  _exports.ROUTER_STORE_STATE = ROUTER_STORE_STATE;
});