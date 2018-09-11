(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react);
    global.Pending = mod.exports;
  }
})(this, function (_exports, _propTypes, _react) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var Pending =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Pending, _Component);

    function Pending() {
      var _this;

      _this = _Component.call(this) || this;
      _this.pending = _this.pending.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = Pending.prototype;

    _proto.pending = function pending() {
      if (this.props.state.pending === true) {
        return [_react.default.createElement("div", {
          key: "1",
          className: "pendingOverlayBackground"
        }), _react.default.createElement("div", {
          key: "2",
          className: "pendingOverlayContent"
        }, _react.default.createElement("div", {
          className: "block"
        }, _react.default.createElement("div", {
          className: "centered"
        }, _react.default.createElement("i", {
          className: "fa fa-spinner fa-pulse fa-3x"
        }))))];
      }
    };

    _proto.render = function render() {
      if (this.props.state.failed === true) {
        return _react.default.createElement("div", {
          className: "error-page text-center"
        }, _react.default.createElement("div", {
          className: "container"
        }, _react.default.createElement("h2", {
          className: "error-title"
        }, "404"), _react.default.createElement("h3", {
          className: "error-subtitle"
        }, "Some bits denied your request."), _react.default.createElement("p", {
          className: "error-text center-block"
        }, "De pagina die u probeerde te bezoeken bestaat niet.")));
      }

      return _react.default.createElement("div", {
        className: 'pendingWrapper'
      }, this.pending(), this.props.children);
    };

    return Pending;
  }(_react.Component);

  _exports.default = Pending;

  _defineProperty(Pending, "propTypes", {
    state: _propTypes.default.shape({
      pending: _propTypes.default.bool.required,
      failed: _propTypes.default.bool.required
    }),
    children: _propTypes.default.oneOfType([_propTypes.default.object.isRequired, _propTypes.default.array.isRequired])
  });
});