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
    global.middleware = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = clientMiddleware;

  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function clientMiddleware(helpers) {
    return function (_ref) {
      var dispatch = _ref.dispatch;
      return function (next) {
        return function (action) {
          if (typeof action === 'function') {
            return action(_objectSpread({
              dispatch: dispatch
            }, helpers));
          }

          var promise = action.promise,
              types = action.types,
              rest = _objectWithoutProperties(action, ["promise", "types"]);

          if (!promise) {
            return next(action);
          }

          var REQUEST = types[0],
              SUCCESS = types[1],
              FAILURE = types[2];
          next(_objectSpread({}, rest, {
            type: REQUEST
          }));
          var actionPromise = promise(helpers, dispatch);
          actionPromise.then(function (result) {
            return next(_objectSpread({}, rest, {
              result: result,
              type: SUCCESS
            }));
          }, function (error) {
            return next(_objectSpread({}, rest, {
              error: error,
              type: FAILURE
            }));
          }).catch(function (error) {
            console.error('MIDDLEWARE ERROR:', error);
            next(_objectSpread({}, rest, {
              error: error,
              type: FAILURE
            }));
          });
          return actionPromise;
        };
      };
    };
  }
});