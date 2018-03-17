(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "react-bootstrap"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("react-bootstrap"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactBootstrap);
    global.connectToConfirm = mod.exports;
  }
})(this, function (_exports, _react, _reactBootstrap) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = connnectToConfirm;
  _react = _interopRequireWildcard(_react);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function connnectToConfirm(conf) {
    return function (WrappedComponent) {
      var thisConf = Object.assign({}, {
        title: 'Actie bevestigen',
        message: 'Weet u zeker dat u deze actie wilt uitvoeren?',
        confirm: 'bestigen',
        cancel: 'annuleren'
      }, conf);

      var ConfirmConnection =
      /*#__PURE__*/
      function (_Component) {
        _inheritsLoose(ConfirmConnection, _Component);

        function ConfirmConnection() {
          var _this;

          _this = _Component.call(this) || this;
          _this.showModal = _this.showModal.bind(_assertThisInitialized(_this));
          _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
          _this.confirm = _this.confirm.bind(_assertThisInitialized(_this));
          _this.renderModal = _this.renderModal.bind(_assertThisInitialized(_this));
          _this.state = {
            showModal: false
          };
          return _this;
        }

        var _proto = ConfirmConnection.prototype;

        _proto.showModal = function showModal(item, action) {
          this.setState({
            showModal: true,
            item: item,
            action: action
          });
        };

        _proto.closeModal = function closeModal() {
          this.setState({
            showModal: false,
            item: null
          });
        };

        _proto.confirm = function confirm() {
          var item = Object.assign({}, this.state.item);
          this.state.action(item);
          this.closeModal();
        };

        _proto.renderModal = function renderModal() {
          return _react.default.createElement(_reactBootstrap.Modal, {
            show: this.state.showModal,
            onHide: this.closeModal
          }, _react.default.createElement(_reactBootstrap.Modal.Header, {
            closeButton: true
          }, _react.default.createElement(_reactBootstrap.Modal.Title, null, thisConf.title)), _react.default.createElement(_reactBootstrap.Modal.Body, null, thisConf.message), _react.default.createElement(_reactBootstrap.Modal.Footer, null, _react.default.createElement(_reactBootstrap.Button, {
            bsStyle: "danger",
            onClick: this.confirm
          }, thisConf.confirm), _react.default.createElement(_reactBootstrap.Button, {
            onClick: this.closeModal
          }, thisConf.cancel)));
        };

        _proto.render = function render() {
          return _react.default.createElement(WrappedComponent, _extends({}, this.props, {
            showModal: this.showModal,
            closeModal: this.closeModal
          }), this.renderModal());
        };

        return ConfirmConnection;
      }(_react.Component);

      return ConfirmConnection;
    };
  }
});