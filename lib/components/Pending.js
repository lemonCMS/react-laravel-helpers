'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pending = (_temp = _class = function (_Component) {
  _inherits(Pending, _Component);

  function Pending() {
    _classCallCheck(this, Pending);

    var _this = _possibleConstructorReturn(this, (Pending.__proto__ || Object.getPrototypeOf(Pending)).call(this));

    _this.pending = _this.pending.bind(_this);
    return _this;
  }

  _createClass(Pending, [{
    key: 'pending',
    value: function pending() {
      if (this.props.state.pending === true) {
        return [_react2.default.createElement('div', { key: '1', className: 'pendingOverlayBackground' }), _react2.default.createElement(
          'div',
          { key: '2', className: 'pendingOverlayContent' },
          _react2.default.createElement(
            'div',
            { className: 'block' },
            _react2.default.createElement(
              'div',
              { className: 'centered' },
              _react2.default.createElement('i', { className: 'fa fa-spinner fa-pulse fa-3x' })
            )
          )
        )];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.state.failed === true) {
        return _react2.default.createElement(
          'div',
          { className: 'error-page text-center' },
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'h2',
              { className: 'error-title' },
              '404'
            ),
            _react2.default.createElement(
              'h3',
              { className: 'error-subtitle' },
              'Some bits denied your request.'
            ),
            _react2.default.createElement(
              'p',
              { className: 'error-text center-block' },
              'De pagina die u probeerde te bezoeken bestaat niet.'
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'pendingWrapper' },
        this.pending(),
        this.props.children
      );
    }
  }]);

  return Pending;
}(_react.Component), _class.propTypes = {
  state: _propTypes2.default.shape({
    pending: _propTypes2.default.bool.required,
    failed: _propTypes2.default.bool.required
  }),
  children: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.array.isRequired])
}, _temp);
exports.default = Pending;