(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "moment"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("moment"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.moment);
    global.moment = mod.exports;
  }
})(this, function (_exports, _moment) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = _exports.setLocale = void 0;
  _moment = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var setLocale = function setLocale(locale) {
    if (locale === void 0) {
      locale = 'en';
    }

    _moment.default.locale(locale);

    return _moment.default;
  };

  _exports.setLocale = setLocale;
  var _default = _moment.default;
  _exports.default = _default;
});