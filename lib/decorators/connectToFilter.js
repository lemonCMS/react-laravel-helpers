(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "lodash/get", "lodash/assign", "lodash/omit", "lodash/has", "lodash/clone", "lodash/isEqual", "lodash/isObject", "lodash/isEmpty", "lodash/map", "react", "react-redux", "classnames", "qs", "../redux/routeState/actions"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("lodash/get"), require("lodash/assign"), require("lodash/omit"), require("lodash/has"), require("lodash/clone"), require("lodash/isEqual"), require("lodash/isObject"), require("lodash/isEmpty"), require("lodash/map"), require("react"), require("react-redux"), require("classnames"), require("qs"), require("../redux/routeState/actions"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.get, global.assign, global.omit, global.has, global.clone, global.isEqual, global.isObject, global.isEmpty, global.map, global.react, global.reactRedux, global.classnames, global.qs, global.actions);
    global.connectToFilter = mod.exports;
  }
})(this, function (_exports, _propTypes, _get2, _assign2, _omit2, _has2, _clone2, _isEqual2, _isObject2, _isEmpty2, _map2, _react, _reactRedux, _classnames, _qs, _actions) {
  "use strict";

  _exports.__esModule = true;
  _exports.createAllParamsForFetch = createAllParamsForFetch;
  _exports.default = connectToFilter;
  _propTypes = _interopRequireDefault(_propTypes);
  _get2 = _interopRequireDefault(_get2);
  _assign2 = _interopRequireDefault(_assign2);
  _omit2 = _interopRequireDefault(_omit2);
  _has2 = _interopRequireDefault(_has2);
  _clone2 = _interopRequireDefault(_clone2);
  _isEqual2 = _interopRequireDefault(_isEqual2);
  _isObject2 = _interopRequireDefault(_isObject2);
  _isEmpty2 = _interopRequireDefault(_isEmpty2);
  _map2 = _interopRequireDefault(_map2);
  _react = _interopRequireWildcard(_react);
  _classnames = _interopRequireDefault(_classnames);
  _qs = _interopRequireDefault(_qs);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var myTimeout = null;

  function createAllParamsForFetch(state, location) {
    var pathname = (0, _get2.default)(state, 'routing.location.pathname', null);
    var params = (0, _assign2.default)((0, _get2.default)(state, ['routesState', 'routes', pathname, 'form'], {}), _qs.default.parse((0, _get2.default)(state, ['routing', 'location', 'search'], ''), {
      ignoreQueryPrefix: true
    }), _qs.default.parse((0, _get2.default)(location, 'search', ''), {
      ignoreQueryPrefix: true
    }));
    return (0, _omit2.default)(params, function (value) {
      return !value;
    });
  }

  function connectToFilter(rest) {
    var path = null;

    if (rest !== 'undefined') {
      if (typeof rest === 'object') {
        if (rest.path !== 'undefined') {
          path = rest.path;
        }
      }
    }

    return function (WrappedComponent) {
      var _dec, _class, _class2, _temp;

      var StateConnection = (_dec = (0, _reactRedux.connect)(function (state) {
        return {
          routing: state.routing,
          routesState: state.routesState
        };
      }), _dec(_class = (_temp = _class2 =
      /*#__PURE__*/
      function (_Component) {
        _inheritsLoose(StateConnection, _Component);

        function StateConnection() {
          var _this;

          _this = _Component.call(this) || this;
          _this.switchPage = _this.switchPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.pushOnState = _this.pushOnState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.pushStateAttempt = _this.pushStateAttempt.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.pushSearch = _this.pushSearch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.clearTimer = _this.clearTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.getParams = _this.getParams.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.toggleOnStack = _this.toggleOnStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.inputOnStack = _this.inputOnStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.onStack = _this.onStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.sortOnStack = _this.sortOnStack.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.removeFromState = _this.removeFromState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.alphabet = _this.alphabet.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.alphaFilter = _this.alphaFilter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.reset = _this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.state = {
            form: {},
            mount: {}
          };
          return _this;
        }

        var _proto = StateConnection.prototype;

        _proto.stringifyFullState = function stringifyFullState(state) {
          return _qs.default.stringify((0, _omit2.default)(state, function (value) {
            return !value;
          }), {
            encode: false
          });
        };

        _proto.componentWillMount = function componentWillMount() {
          var params = createAllParamsForFetch(this.props);
          this.setState({
            form: (0, _clone2.default)(params),
            mount: (0, _clone2.default)(params)
          });
        };

        _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
          if (this.props.routing.location.pathname === nextProps.routing.location.pathname) {
            if (!(0, _isEqual2.default)(this.state, nextProps.routing.location.state)) {
              if ((0, _isObject2.default)(nextProps.routing.location.state)) {
                this.props.dispatch((0, _actions.storeState)(nextProps.routing.location.pathname, nextProps.routing.location.state));
                this.setState(nextProps.routing.location.state);
              } else if (!(0, _isEmpty2.default)(this.state.mount) && !(0, _isEqual2.default)(this.state.mount, this.state.form)) {
                this.props.dispatch((0, _actions.storeState)(this.props.routing.location.pathname, this.state.mount));
                this.setState({
                  form: this.state.mount
                });
              }
            }
          }
        };

        _proto.reset = function reset() {
          this.setState({
            form: {}
          }, this.pushStateAttempt);
        };

        _proto.onStack = function onStack(key, value) {
          return !!this.state.form[key] && this.state.form[key].indexOf(String(value)) > -1;
        };

        _proto.getParams = function getParams() {
          return createAllParamsForFetch(this.props);
        };

        _proto.inputOnStack = function inputOnStack(key) {
          return this.state.form[key] ? this.state.form[key] : '';
        };

        _proto.sortOnStack = function sortOnStack(field) {
          var state = Object.assign({}, this.state.form);

          if ((0, _has2.default)(state, 'sort')) {
            if ((0, _get2.default)(state, 'sort.field') === field && (0, _get2.default)(state, 'sort.order') === 'asc') {
              state.sort = {
                field: field,
                order: 'desc'
              };
            } else {
              state.sort = {
                field: field,
                order: 'asc'
              };
            }
          } else {
            state.sort = {
              field: field,
              order: 'asc'
            };
          }

          this.setState({
            form: state
          }, this.pushStateAttempt);
        };

        _proto.toggleOnStack = function toggleOnStack(key, value) {
          var state = Object.assign({}, this.state.form);

          if (!state[key]) {
            state[key] = [value];
          } else {
            var index = state[key].indexOf(String(value));

            if (index < 0) {
              state[key].push(value);
            } else {
              delete state[key][index];
            }
          }

          if (state.page) {
            state.page = null;
          }

          this.setState({
            form: state
          }, this.pushStateAttempt);
        };

        _proto.removeFromState = function removeFromState(key) {
          var state = Object.assign({}, this.state.form);
          delete state[key];
          this.setState({
            form: state
          }, this.pushStateAttempt);
        };

        _proto.mergeState = function mergeState(values) {
          var state = Object.assign({}, this.state.form, values);
          this.setState({
            form: state
          }, this.pushStateAttempt);
        };

        _proto.pushOnState = function pushOnState(key, value, clear) {
          if (clear === void 0) {
            clear = [];
          }

          var state = Object.assign({}, this.state.form);
          state[key] = value;

          if (state.page) {
            state.page = null;
          }

          if (Object.keys(clear).length > 0) {
            (0, _map2.default)(clear, function (field) {
              state[field] = undefined;
            });
          }

          this.setState({
            form: state
          }, this.pushStateAttempt);
        };

        _proto.pushStateAttempt = function pushStateAttempt() {
          if (path === null) {
            path = (0, _get2.default)(this.props.routing, 'location.pathname');
          }

          this.props.dispatch((0, _actions.storeState)(path, this.state.form));
          var q = this.stringifyFullState((0, _omit2.default)(this.state.form, ['t']));

          if (q.length > 0) {
            // this.context.router.history.push(_get(this.props.routing, 'location.pathname') + '?' + q);
            this.context.router.history.push({
              pathname: path,
              search: _qs.default.stringify((0, _omit2.default)(this.state.form, ['t'])),
              state: this.state
            });
          } else {
            var d = new Date();
            this.context.router.history.push({
              pathname: path,
              search: _qs.default.stringify({
                t: d.getTime()
              }),
              state: this.state
            });
          }
        };

        _proto.switchPage = function switchPage(page) {
          var state = Object.assign({}, this.state.form);
          state.page = page;
          this.setState({
            form: state
          }, this.pushStateAttempt);
        };

        _proto.pushSearch = function pushSearch(value) {
          var _this2 = this;

          var form = this.state.form;
          form.q = value;
          this.setState({
            form: form
          }, function () {
            if (myTimeout) {
              clearTimeout(myTimeout);
            }

            myTimeout = setTimeout(function () {
              _this2.pushOnState('q', value);
            }, 500);
          });
        };

        _proto.clearTimer = function clearTimer() {
          if (myTimeout) {
            clearTimeout(myTimeout);
          }
        };

        _proto.alphabet = function alphabet() {
          var _this3 = this;

          var stack = this.inputOnStack('alfa');
          var name = 'alfa';
          var range = ['~', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
          return _react.default.createElement("div", {
            className: "panel panel-border-tb"
          }, _react.default.createElement("div", {
            className: "panel-heading"
          }, _react.default.createElement("h4", {
            className: "pnael-title"
          }, "Alfabet")), _react.default.createElement("div", {
            className: "panel-body"
          }, _react.default.createElement("div", {
            className: "filter-color-container"
          }, _react.default.createElement("div", {
            className: "row"
          }, (0, _map2.default)(range, function (val, key) {
            return _this3.alphaFilter(name, key, val, stack);
          })))));
        };

        _proto.alphaFilter = function alphaFilter(name, key, item, stack) {
          var _this4 = this;

          if (stack === item) {
            return _react.default.createElement("button", {
              key: key,
              className: (0, _classnames.default)({
                btn: true,
                'btn-link': true,
                'filter-size-box': true,
                active: stack === item
              }),
              onClick: function onClick() {
                _this4.removeFromState(name, item);
              }
            }, item);
          }

          return _react.default.createElement("button", {
            key: key,
            className: (0, _classnames.default)({
              btn: true,
              'btn-link': true,
              'filter-size-box': true,
              active: stack === item
            }),
            onClick: function onClick() {
              _this4.pushOnState(name, item);
            }
          }, item);
        };

        _proto.render = function render() {
          return _react.default.createElement(WrappedComponent, _extends({}, this.props, {
            switchPage: this.switchPage,
            pushOnState: this.pushOnState,
            removeFromState: this.removeFromState,
            getParams: this.getParams,
            toggleOnStack: this.toggleOnStack,
            inputOnStack: this.inputOnStack,
            onStack: this.onStack,
            sortOnStack: this.sortOnStack,
            alphabet: this.alphabet,
            pushSearch: this.pushSearch,
            pushStateAttempt: this.pushStateAttempt,
            reset: this.reset
          }));
        };

        return StateConnection;
      }(_react.Component), _defineProperty(_class2, "propTypes", {
        routing: _propTypes.default.object,
        dispatch: _propTypes.default.func
      }), _defineProperty(_class2, "contextTypes", {
        router: _propTypes.default.object
      }), _temp)) || _class);
      return StateConnection;
    };
  }
});