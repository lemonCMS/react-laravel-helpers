(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "numeral"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("numeral"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.numeral);
    global.numeral = mod.exports;
  }
})(this, function (_exports, _numeral) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  _numeral = _interopRequireDefault(_numeral);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  _numeral.default.register('locale', 'nl-nl', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'mln',
      billion: 'mrd',
      trillion: 'bln'
    },
    ordinal: function ordinal(number) {
      var remainder = number % 100;
      return number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20 ? 'ste' : 'de';
    },
    currency: {
      symbol: '€ '
    }
  });

  _numeral.default.locale('nl-nl');

  var _default = _numeral.default;
  _exports.default = _default;
});