'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _InputGroup = require('react-bootstrap/lib/InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = (_temp = _class = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search() {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

    _this.pushSearch = _this.pushSearch.bind(_this);
    _this.clearSearch = _this.clearSearch.bind(_this);
    _this.state = {
      q: '',
      skip: 0
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        q: this.props.query,
        skip: 0
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.skip === 0) {
        this.setState({ q: nextProps.query });
      }

      if (this.state.skip > 0) {
        this.setState({ skip: this.state.skip - 1 });
      }
    }
  }, {
    key: 'pushSearch',
    value: function pushSearch(e) {
      var _this2 = this;

      var value = e.target.value;
      this.setState({ q: value, skip: 6 }, function () {
        _this2.props.pushSearch(value);
      });
    }
  }, {
    key: 'clearSearch',
    value: function clearSearch() {
      this.setState({
        q: ''
      }, this.props.pushSearch(''));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _FormGroup2.default,
        {
          controlId: 'q'
        },
        _react2.default.createElement(
          _ControlLabel2.default,
          null,
          'Zoeken'
        ),
        _react2.default.createElement(
          _InputGroup2.default,
          null,
          _react2.default.createElement(_FormControl2.default, {
            type: 'text',
            value: this.state.q,
            placeholder: 'Zoeken',
            onChange: this.pushSearch
          }),
          _react2.default.createElement(
            _InputGroup2.default.Button,
            null,
            _react2.default.createElement(
              _Button2.default,
              { disabled: this.state.q === '', onClick: this.clearSearch },
              _react2.default.createElement('i', { className: 'fa fa-remove' })
            )
          )
        )
      );
    }
  }]);

  return Search;
}(_react2.default.Component), _class.propTypes = {
  'pushSearch': _propTypes2.default.func,
  'query': _propTypes2.default.string
}, _temp);
exports.default = Search;