'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setLocale = exports.setLocale = function setLocale() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

  _moment2.default.locale(locale);
  return _moment2.default;
};

exports.default = _moment2.default;