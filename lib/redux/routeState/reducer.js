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
    global.reducer = mod.exports;
  }
})(this, function (_exports, _constants) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = reducer;

  var storeStateReducer = function storeStateReducer(object, id, value) {
    var clone = Object.assign({}, object);
    clone[id] = value;
    return clone;
  };

  var initialState = {
    routes: {}
  };

  function reducer(state, action) {
    if (state === void 0) {
      state = initialState;
    }

    if (action === void 0) {
      action = {};
    }

    switch (action.type) {
      case _constants.ROUTER_STORE_STATE:
        return Object.assign({}, state, {
          routes: storeStateReducer(state.routes, action.route, action.state)
        });

      default:
        return Object.assign({}, state);
    }
  }
});