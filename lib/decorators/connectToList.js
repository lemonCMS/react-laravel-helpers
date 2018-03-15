'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connnectToList;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _flatten2 = require('lodash/flatten');

var _flatten3 = _interopRequireDefault(_flatten2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _redial = require('@wicked_query/redial');

var _actions = require('../redux/store/actions');

var _DataTable = require('../components/DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _connectToFilter = require('./connectToFilter');

var _connectToFilter2 = _interopRequireDefault(_connectToFilter);

var _connectToConfirm = require('./connectToConfirm');

var _connectToConfirm2 = _interopRequireDefault(_connectToConfirm);

var _Search = require('../components/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Pending = require('../components/Pending');

var _Pending2 = _interopRequireDefault(_Pending);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connnectToList(properties) {
  return function (WrappedComponent) {
    var _dec, _dec2, _dec3, _dec4, _class, _class2, _temp;

    var Connection = (_dec = (0, _redial.provideHooks)({
      fetch: function fetch(_ref) {
        var _ref$store = _ref.store,
            dispatch = _ref$store.dispatch,
            getState = _ref$store.getState,
            params = _ref.params;

        var promises = [];
        var state = (0, _connectToFilter.createAllParamsForFetch)(getState());
        var api = function api() {
          if ((0, _isFunction3.default)(properties.api)) {
            return properties.api(params);
          }
          return properties.api;
        };

        promises.push(dispatch((0, _actions.load)(properties.key, api(), state)));
        return Promise.all(promises);
      }
    }), _dec2 = (0, _connectToFilter2.default)(), _dec3 = (0, _connectToConfirm2.default)(), _dec4 = (0, _reactRedux.connect)(function (state) {
      return {
        data: state.store[properties.key],
        auth: state.auth
      };
    }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = _class2 = function (_Component) {
      _inherits(Connection, _Component);

      function Connection() {
        _classCallCheck(this, Connection);

        var _this = _possibleConstructorReturn(this, (Connection.__proto__ || Object.getPrototypeOf(Connection)).call(this));

        _this.filter = _this.filter.bind(_this);
        _this.show = _this.show.bind(_this);
        _this.edit = _this.edit.bind(_this);
        _this.destroy = _this.destroy.bind(_this);
        _this.path = _this.path.bind(_this);
        _this.state = {
          forceUpdate: false,
          path: ''
        };
        return _this;
      }

      _createClass(Connection, [{
        key: 'path',
        value: function path() {
          var path = properties.path;
          if ((0, _isFunction3.default)(properties.path)) {
            path = properties.path(this.context.router.params);
          }
          this.setState({ path: path });
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.path();
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
          this.path();
        }
      }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
          if ((0, _get3.default)(nextProps, ['data', 'item', 'deleted'], false) === true) {
            this.props.dispatch((0, _actions.clearItem)(properties.key));
            this.props.pushStateAttempt();
          }
        }
      }, {
        key: 'filter',
        value: function filter() {
          return _react2.default.createElement(
            'div',
            { className: 'panel panel-border-tb' },
            _react2.default.createElement(
              'div',
              { className: 'panel-heading' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: properties.path + '/new', className: 'pull-right' },
                _react2.default.createElement('i', { className: 'fa fa-plus' }),
                ' nieuw item aanmaken'
              ),
              _react2.default.createElement(
                'h4',
                { className: 'pnael-title' },
                'Verfijn'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'panel-body' },
              _react2.default.createElement(_Search2.default, {
                pushSearch: this.props.pushSearch,
                inputOnStack: this.props.inputOnStack,
                query: this.props.inputOnStack('q') })
            )
          );
        }
      }, {
        key: 'show',
        value: function show(item) {
          this.context.router.push(this.state.path + '/' + item.id);
        }
      }, {
        key: 'edit',
        value: function edit(item) {
          this.context.router.push(this.state.path + '/' + item.id + '/edit');
        }
      }, {
        key: 'destroy',
        value: function destroy(item) {
          this.props.dispatch((0, _actions.destroyItem)(this.state.path, '' + properties.api, item.id));
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var dropDown = {
            name: 'Acties',
            dropdownButton: [{ name: 'bekijken', onClick: this.show }, { name: 'wijzigen', onClick: this.edit }]
          };

          if (!properties.noDelete) {
            dropDown.dropdownButton.push({ divider: true });
            dropDown.dropdownButton.push({
              name: 'verwijderen',
              onClick: function onClick(item) {
                _this2.setState({ forceUpdate: true }, function () {
                  _this2.props.showModal(item, _this2.destroy);
                });
              }
            });
          }

          var rows = (0, _cloneDeep3.default)((0, _has3.default)(properties, 'rows') ? properties.rows : [{ cols: properties.cols }]);
          rows[0].cols = (0, _flatten3.default)([rows[0].cols, [dropDown]]);

          var getTable = function getTable() {
            if ((0, _get3.default)(_this2.props, ['data', 'success'], false) === true) {
              return _react2.default.createElement(_DataTable2.default, {
                records: _this2.props.data.list.data,
                rows: rows,
                dispatch: _this2.props.dispatch,
                pushOnState: _this2.props.pushOnState,
                inputOnStack: _this2.props.inputOnStack,
                order: _this2.props.inputOnStack('order'),
                auth: _this2.props.auth,
                edit: _this2.edit,
                show: _this2.show,
                paginator: {
                  currPage: _this2.props.data.list.current_page,
                  lastPage: _this2.props.data.list.last_page,
                  onChange: _this2.props.switchPage
                }
              });
            }
          };

          var state = {
            pending: (0, _get3.default)(this.props.data, 'pending', false),
            failed: (0, _get3.default)(this.props.data, 'failed', false)
          };

          var warning = function warning() {
            if ((0, _has3.default)(_this2.props, ['data', 'item', 'error'])) {
              return _react2.default.createElement(
                _reactBootstrap.Alert,
                { bsStyle: 'danger' },
                (0, _get3.default)(_this2.props, ['data', 'item', 'error'])
              );
            }
          };

          return _react2.default.createElement(
            WrappedComponent,
            this.props,
            this.filter(),
            warning(),
            _react2.default.createElement(
              _Pending2.default,
              { state: state },
              getTable()
            ),
            this.props.children
          );
        }
      }]);

      return Connection;
    }(_react.Component), _class2.propTypes = {
      children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
      auth: _propTypes2.default.object,
      data: _propTypes2.default.object,
      switchPage: _propTypes2.default.func,
      pushSearch: _propTypes2.default.func,
      pushOnState: _propTypes2.default.func,
      pushStateAttempt: _propTypes2.default.func,
      inputOnStack: _propTypes2.default.func,
      dispatch: _propTypes2.default.func,
      showModal: _propTypes2.default.func
    }, _class2.contextTypes = {
      router: _propTypes2.default.object
    }, _temp)) || _class) || _class) || _class) || _class);


    return Connection;
  };
}