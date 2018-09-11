(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react", "react-bootstrap/lib/FormGroup", "react-bootstrap/lib/ControlLabel", "react-bootstrap/lib/FormControl", "react-bootstrap/lib/Button", "react-bootstrap/lib/InputGroup"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"), require("react-bootstrap/lib/FormGroup"), require("react-bootstrap/lib/ControlLabel"), require("react-bootstrap/lib/FormControl"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/InputGroup"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react, global.FormGroup, global.ControlLabel, global.FormControl, global.Button, global.InputGroup);
    global.Search = mod.exports;
  }
})(this, function (_exports, _propTypes, _react, _FormGroup, _ControlLabel, _FormControl, _Button, _InputGroup) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _FormGroup = _interopRequireDefault(_FormGroup);
  _ControlLabel = _interopRequireDefault(_ControlLabel);
  _FormControl = _interopRequireDefault(_FormControl);
  _Button = _interopRequireDefault(_Button);
  _InputGroup = _interopRequireDefault(_InputGroup);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var Search =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Search, _React$Component);

    function Search() {
      var _this;

      _this = _React$Component.call(this) || this;
      _this.pushSearch = _this.pushSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.clearSearch = _this.clearSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        q: '',
        skip: 0
      };
      return _this;
    }

    var _proto = Search.prototype;

    _proto.componentWillMount = function componentWillMount() {
      this.setState({
        q: this.props.query,
        skip: 0
      });
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.state.skip === 0) {
        this.setState({
          q: nextProps.query
        });
      }

      if (this.state.skip > 0) {
        this.setState({
          skip: this.state.skip - 1
        });
      }
    };

    _proto.pushSearch = function pushSearch(e) {
      var _this2 = this;

      var value = e.target.value;
      this.setState({
        q: value,
        skip: 6
      }, function () {
        _this2.props.pushSearch(value);
      });
    };

    _proto.clearSearch = function clearSearch() {
      this.setState({
        q: ''
      }, this.props.pushSearch(''));
    };

    _proto.render = function render() {
      return _react.default.createElement(_FormGroup.default, {
        controlId: "q"
      }, _react.default.createElement(_ControlLabel.default, null, "Zoeken"), _react.default.createElement(_InputGroup.default, null, _react.default.createElement(_FormControl.default, {
        type: "text",
        value: this.state.q,
        placeholder: "Zoeken",
        onChange: this.pushSearch
      }), _react.default.createElement(_InputGroup.default.Button, null, _react.default.createElement(_Button.default, {
        disabled: this.state.q === '',
        onClick: this.clearSearch
      }, _react.default.createElement("i", {
        className: "fa fa-remove"
      })))));
    };

    return Search;
  }(_react.default.Component);

  _defineProperty(Search, "propTypes", {
    'pushSearch': _propTypes.default.func,
    'query': _propTypes.default.string
  });

  var _default = Search;
  _exports.default = _default;
});