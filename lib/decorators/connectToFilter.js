'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createAllParamsForFetch = createAllParamsForFetch;
exports.default = connectToFilter;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _actions = require('../redux/routeState/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var myTimeout = null;

function createAllParamsForFetch(state) {

  var pathname = (0, _get3.default)(state, 'routing.location.pathname', null);
  var params = (0, _assign3.default)((0, _get3.default)(state, ['routesState', 'routes', pathname, 'form'], {}), _qs2.default.parse((0, _get3.default)(state, ['routing', 'location', 'search'], '').substr(1)));

  return (0, _omit3.default)(params, function (value) {
    return !value;
  });
}

function connectToFilter(rest) {
  var path = null;
  if (rest !== 'undefined') {
    if ((typeof rest === 'undefined' ? 'undefined' : _typeof(rest)) === 'object') {
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
    }), _dec(_class = (_temp = _class2 = function (_Component) {
      _inherits(StateConnection, _Component);

      function StateConnection() {
        _classCallCheck(this, StateConnection);

        var _this = _possibleConstructorReturn(this, (StateConnection.__proto__ || Object.getPrototypeOf(StateConnection)).call(this));

        _this.switchPage = _this.switchPage.bind(_this);
        _this.pushOnState = _this.pushOnState.bind(_this);
        _this.pushStateAttempt = _this.pushStateAttempt.bind(_this);
        _this.pushSearch = _this.pushSearch.bind(_this);
        _this.clearTimer = _this.clearTimer.bind(_this);
        _this.getParams = _this.getParams.bind(_this);
        _this.toggleOnStack = _this.toggleOnStack.bind(_this);
        _this.inputOnStack = _this.inputOnStack.bind(_this);
        _this.onStack = _this.onStack.bind(_this);
        _this.sortOnStack = _this.sortOnStack.bind(_this);
        _this.removeFromState = _this.removeFromState.bind(_this);
        _this.alphabet = _this.alphabet.bind(_this);
        _this.alphaFilter = _this.alphaFilter.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.state = {
          form: {},
          mount: {}
        };
        return _this;
      }

      _createClass(StateConnection, [{
        key: 'stringifyFullState',
        value: function stringifyFullState(state) {
          return _qs2.default.stringify((0, _omit3.default)(state, function (value) {
            return !value;
          }), { encode: false });
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          var params = createAllParamsForFetch(this.props);
          this.setState({ form: (0, _clone3.default)(params), mount: (0, _clone3.default)(params) });
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (this.props.routing.location.pathname === nextProps.routing.location.pathname) {
            if (!(0, _isEqual3.default)(this.state, nextProps.routing.location.state)) {
              if ((0, _isObject3.default)(nextProps.routing.location.state)) {
                this.props.dispatch((0, _actions.storeState)(nextProps.routing.location.pathname, nextProps.routing.location.state));
                this.setState(nextProps.routing.location.state);
              } else if (!(0, _isEmpty3.default)(this.state.mount) && !(0, _isEqual3.default)(this.state.mount, this.state.form)) {
                this.props.dispatch((0, _actions.storeState)(this.props.routing.location.pathname, this.state.mount));
                this.setState({ form: this.state.mount });
              }
            }
          }
        }
      }, {
        key: 'reset',
        value: function reset() {
          this.setState({ form: {} }, this.pushStateAttempt);
        }
      }, {
        key: 'onStack',
        value: function onStack(key, value) {
          return !!this.state.form[key] && this.state.form[key].indexOf(String(value)) > -1;
        }
      }, {
        key: 'getParams',
        value: function getParams() {
          return createAllParamsForFetch(this.props);
        }
      }, {
        key: 'inputOnStack',
        value: function inputOnStack(key) {
          return this.state.form[key] ? this.state.form[key] : '';
        }
      }, {
        key: 'sortOnStack',
        value: function sortOnStack(field) {
          var state = Object.assign({}, this.state.form);

          if ((0, _has3.default)(state, 'sort')) {
            if ((0, _get3.default)(state, 'sort.field') === field && (0, _get3.default)(state, 'sort.order') === 'asc') {
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
          this.setState({ form: state }, this.pushStateAttempt);
        }
      }, {
        key: 'toggleOnStack',
        value: function toggleOnStack(key, value) {
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
          this.setState({ form: state }, this.pushStateAttempt);
        }
      }, {
        key: 'removeFromState',
        value: function removeFromState(key) {
          var state = Object.assign({}, this.state.form);
          delete state[key];
          this.setState({ form: state }, this.pushStateAttempt);
        }
      }, {
        key: 'pushOnState',
        value: function pushOnState(key, value) {
          var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

          var state = Object.assign({}, this.state.form);
          state[key] = value;
          if (state.page) {
            state.page = null;
          }

          if (Object.keys(clear).length > 0) {
            (0, _map3.default)(clear, function (field) {
              state[field] = undefined;
            });
          }

          this.setState({ form: state }, this.pushStateAttempt);
        }
      }, {
        key: 'pushStateAttempt',
        value: function pushStateAttempt() {
          if (path === null) {
            path = (0, _get3.default)(this.props.routing, 'location.pathname');
          }

          this.props.dispatch((0, _actions.storeState)(path, this.state.form));
          var q = this.stringifyFullState((0, _omit3.default)(this.state.form, ['t']));
          if (q.length > 0) {
            // this.context.router.history.push(_get(this.props.routing, 'location.pathname') + '?' + q);
            this.context.router.history.push({
              pathname: path,
              search: _qs2.default.stringify((0, _omit3.default)(this.state.form, ['t'])),
              state: this.state
            });
          } else {
            var d = new Date();
            this.context.router.history.push({
              pathname: path,
              search: _qs2.default.stringify({ t: d.getTime() }),
              state: this.state
            });
          }
        }
      }, {
        key: 'switchPage',
        value: function switchPage(page) {
          var state = Object.assign({}, this.state.form);
          state.page = page;
          this.setState({ form: state }, this.pushStateAttempt);
        }
      }, {
        key: 'pushSearch',
        value: function pushSearch(value) {
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
        }
      }, {
        key: 'clearTimer',
        value: function clearTimer() {
          if (myTimeout) {
            clearTimeout(myTimeout);
          }
        }
      }, {
        key: 'alphabet',
        value: function alphabet() {
          var _this3 = this;

          var stack = this.inputOnStack('alfa');
          var name = 'alfa';
          var range = ['~', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
          return _react2.default.createElement(
            'div',
            { className: 'panel panel-border-tb' },
            _react2.default.createElement(
              'div',
              { className: 'panel-heading' },
              _react2.default.createElement(
                'h4',
                { className: 'pnael-title' },
                'Alfabet'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'panel-body' },
              _react2.default.createElement(
                'div',
                { className: 'filter-color-container' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  (0, _map3.default)(range, function (val, key) {
                    return _this3.alphaFilter(name, key, val, stack);
                  })
                )
              )
            )
          );
        }
      }, {
        key: 'alphaFilter',
        value: function alphaFilter(name, key, item, stack) {
          var _this4 = this;

          if (stack === item) {
            return _react2.default.createElement(
              'button',
              {
                key: key,
                className: (0, _classnames2.default)({
                  btn: true,
                  'btn-link': true,
                  'filter-size-box': true,
                  active: stack === item
                }),
                onClick: function onClick() {
                  _this4.removeFromState(name, item);
                }
              },
              item
            );
          }

          return _react2.default.createElement(
            'button',
            {
              key: key,
              className: (0, _classnames2.default)({
                btn: true,
                'btn-link': true,
                'filter-size-box': true,
                active: stack === item
              }),
              onClick: function onClick() {
                _this4.pushOnState(name, item);
              }
            },
            item
          );
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
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
        }
      }]);

      return StateConnection;
    }(_react.Component), _class2.propTypes = {
      routing: _propTypes2.default.object,
      dispatch: _propTypes2.default.func
    }, _class2.contextTypes = {
      router: _propTypes2.default.object
    }, _temp)) || _class);


    return StateConnection;
  };
}