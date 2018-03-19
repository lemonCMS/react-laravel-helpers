(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "lodash/get", "react", "../redux/store/actions"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("lodash/get"), require("react"), require("../redux/store/actions"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.get, global.react, global.actions);
    global.ItemComponent = mod.exports;
  }
})(this, function (_exports, _propTypes, _get2, _react, _actions) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _get2 = _interopRequireDefault(_get2);
  _react = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  var TestComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(TestComponent, _React$Component);

    function TestComponent(key, path) {
      var _this;

      _this = _React$Component.call(this) || this;
      Object.defineProperty(_assertThisInitialized(_this), "onSubmit", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function () {
          var _value = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(payload) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", new Promise(function (resolve) {
                      var promise = null;

                      if (_this.state.edit) {
                        promise = _this.context.store.dispatch((0, _actions.post)(_this.key, "/admin/" + _this.key, payload));
                      } else {
                        promise = _this.context.store.dispatch((0, _actions.update)(_this.key, "/admin/" + _this.key, _this.props.params.id, payload));
                      }

                      promise.then(function (ret) {
                        if (ret && ret.hasOwnProperty('error')) {
                          resolve(ret.error);
                        }

                        resolve();
                      }).catch(function (err) {
                        if (err && err.hasOwnProperty('error')) {
                          resolve(err.error);
                        }

                        resolve(err);
                      });
                    }));

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function value(_x) {
            return _value.apply(this, arguments);
          };
        }()
      });
      _this.edit = _this.edit.bind(_assertThisInitialized(_this));
      _this.handleSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_this));
      _this.key = key;
      _this.path = path;
      return _this;
    }

    var _proto = TestComponent.prototype;

    _proto.componentWillMount = function componentWillMount() {
      this.setState({
        edit: this.props.routing.history.pathname.match(/(edit|confirm|close)$/g),
        confirm: this.props.routing.history.pathname.match(/confirm$/g),
        close: this.props.routing.history.pathname.match(/close/g),
        newItem: this.props.routing.history.pathname.match(/new/g)
      });
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var thisProps = JSON.parse(JSON.stringify(this.props));
      var nProps = JSON.parse(JSON.stringify(nextProps));
      this.setState({
        edit: nextProps.routing.history.pathname.match(/edit$/g),
        newItem: nextProps.routing.history.pathname.match(/new/g)
      }, function () {
        if (!!_this2.state.newItem && (0, _get2.default)(thisProps, 'item.actionStatus.success', false) === false && (0, _get2.default)(nProps, 'item.actionStatus.success', false) === true) {
          _this2.context.router.history.push(_this2.path + "/" + _this2.props.item.id + "/edit");
        }
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.props.dispatch((0, _actions.clearNetworkState)(this.key));
    };

    _proto.edit = function edit() {
      this.context.router.push(this.path + "/" + this.props.params.id + "/edit");
    };

    _proto.render = function render() {
      return _react.default.createElement("div", null, "Please implement render method in own class.");
    };

    return TestComponent;
  }(_react.default.Component);

  Object.defineProperty(TestComponent, "contextTypes", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      'router': _propTypes.default.object
    }
  });
  TestComponent.propTypes = {
    'dispatch': _propTypes.default.func,
    'item': _propTypes.default.object,
    'params': _propTypes.default.object,
    'routing': _propTypes.default.object
  };
  TestComponent.defaultProps = {};
  var _default = TestComponent;
  _exports.default = _default;
});