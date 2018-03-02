'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_numeral2.default.register('locale', 'nl-nl', {
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
_numeral2.default.locale('nl-nl');
exports.default = _numeral2.default;