'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connnectToConfirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connnectToConfirm(conf) {
  return function (WrappedComponent) {

    var thisConf = Object.assign({}, {
      title: 'Actie bevestigen',
      message: 'Weet u zeker dat u deze actie wilt uitvoeren?',
      confirm: 'bestigen',
      cancel: 'annuleren'
    }, conf);

    var ConfirmConnection = function (_Component) {
      _inherits(ConfirmConnection, _Component);

      function ConfirmConnection() {
        _classCallCheck(this, ConfirmConnection);

        var _this = _possibleConstructorReturn(this, (ConfirmConnection.__proto__ || Object.getPrototypeOf(ConfirmConnection)).call(this));

        _this.showModal = _this.showModal.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.renderModal = _this.renderModal.bind(_this);
        _this.state = {
          showModal: false
        };
        return _this;
      }

      _createClass(ConfirmConnection, [{
        key: 'showModal',
        value: function showModal(item, action) {
          this.setState({ showModal: true, item: item, action: action });
        }
      }, {
        key: 'closeModal',
        value: function closeModal() {
          this.setState({ showModal: false, item: null });
        }
      }, {
        key: 'confirm',
        value: function confirm() {
          var item = Object.assign({}, this.state.item);
          this.state.action(item);
          this.closeModal();
        }
      }, {
        key: 'renderModal',
        value: function renderModal() {
          return _react2.default.createElement(
            _reactBootstrap.Modal,
            { show: this.state.showModal,
              onHide: this.closeModal },
            _react2.default.createElement(
              _reactBootstrap.Modal.Header,
              { closeButton: true },
              _react2.default.createElement(
                _reactBootstrap.Modal.Title,
                null,
                thisConf.title
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Modal.Body,
              null,
              thisConf.message
            ),
            _react2.default.createElement(
              _reactBootstrap.Modal.Footer,
              null,
              _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'danger',
                  onClick: this.confirm },
                thisConf.confirm
              ),
              _react2.default.createElement(
                _reactBootstrap.Button,
                { onClick: this.closeModal },
                thisConf.cancel
              )
            )
          );
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            WrappedComponent,
            _extends({}, this.props, {
              showModal: this.showModal,
              closeModal: this.closeModal
            }),
            this.renderModal()
          );
        }
      }]);

      return ConfirmConnection;
    }(_react.Component);

    return ConfirmConnection;
  };
}