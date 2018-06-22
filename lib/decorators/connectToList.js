(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "react", "lodash/get", "lodash/has", "lodash/flatten", "lodash/compact", "lodash/cloneDeep", "lodash/isFunction", "react-redux", "react-bootstrap", "react-router-dom", "@wicked_query/redial", "../redux/store/actions", "../components/DataTable", "./connectToFilter", "./connectToConfirm", "../components/Search", "../components/Pending"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("react"), require("lodash/get"), require("lodash/has"), require("lodash/flatten"), require("lodash/compact"), require("lodash/cloneDeep"), require("lodash/isFunction"), require("react-redux"), require("react-bootstrap"), require("react-router-dom"), require("@wicked_query/redial"), require("../redux/store/actions"), require("../components/DataTable"), require("./connectToFilter"), require("./connectToConfirm"), require("../components/Search"), require("../components/Pending"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.react, global.get, global.has, global.flatten, global.compact, global.cloneDeep, global.isFunction, global.reactRedux, global.reactBootstrap, global.reactRouterDom, global.redial, global.actions, global.DataTable, global.connectToFilter, global.connectToConfirm, global.Search, global.Pending);
    global.connectToList = mod.exports;
  }
})(this, function (_exports, _propTypes, _react, _get2, _has2, _flatten2, _compact2, _cloneDeep2, _isFunction2, _reactRedux, _reactBootstrap, _reactRouterDom, _redial, _actions, _DataTable, _connectToFilter, _connectToConfirm, _Search, _Pending) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = connnectToList;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _get2 = _interopRequireDefault(_get2);
  _has2 = _interopRequireDefault(_has2);
  _flatten2 = _interopRequireDefault(_flatten2);
  _compact2 = _interopRequireDefault(_compact2);
  _cloneDeep2 = _interopRequireDefault(_cloneDeep2);
  _isFunction2 = _interopRequireDefault(_isFunction2);
  _DataTable = _interopRequireDefault(_DataTable);
  _connectToFilter = _interopRequireWildcard(_connectToFilter);
  _connectToConfirm = _interopRequireDefault(_connectToConfirm);
  _Search = _interopRequireDefault(_Search);
  _Pending = _interopRequireDefault(_Pending);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function connnectToList(properties) {
    return function (WrappedComponent) {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _temp;

      var Connection = (_dec = (0, _redial.provideHooks)({
        fetch: function fetch(_ref) {
          var _ref$store = _ref.store,
              dispatch = _ref$store.dispatch,
              getState = _ref$store.getState,
              params = _ref.params,
              location = _ref.location;
          var promises = [];
          var state = (0, _connectToFilter.createAllParamsForFetch)(getState(), location);

          var api = function api() {
            if ((0, _isFunction2.default)(properties.api)) {
              return properties.api(params);
            }

            return properties.api;
          };

          promises.push(dispatch((0, _actions.load)(properties.key, api(), state)));
          return Promise.all(promises);
        }
      }), _dec2 = (0, _connectToFilter.default)(), _dec3 = (0, _connectToConfirm.default)(), _dec4 = (0, _reactRedux.connect)(function (state) {
        return {
          data: state.store[properties.key],
          auth: state.auth
        };
      }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = _class2 =
      /*#__PURE__*/
      function (_Component) {
        _inheritsLoose(Connection, _Component);

        function Connection() {
          var _this;

          _this = _Component.call(this) || this;
          _this.filter = _this.filter.bind(_assertThisInitialized(_this));
          _this.show = _this.show.bind(_assertThisInitialized(_this));
          _this.edit = _this.edit.bind(_assertThisInitialized(_this));
          _this.destroy = _this.destroy.bind(_assertThisInitialized(_this));
          _this.path = _this.path.bind(_assertThisInitialized(_this));
          _this.state = {
            forceUpdate: false,
            path: ''
          };
          return _this;
        }

        var _proto = Connection.prototype;

        _proto.path = function path() {
          var path = properties.path;

          if ((0, _isFunction2.default)(properties.path)) {
            path = properties.path(this.context.router.params);
          }

          this.setState({
            path: path
          });
        };

        _proto.componentWillMount = function componentWillMount() {
          this.path();
        };

        _proto.componentWillReceiveProps = function componentWillReceiveProps() {
          this.path();
        };

        _proto.componentWillUpdate = function componentWillUpdate(nextProps) {
          if ((0, _get2.default)(nextProps, ['data', 'item', 'deleted'], false) === true) {
            this.props.dispatch((0, _actions.clearItem)(properties.key));
            this.props.pushStateAttempt();
          }
        };

        _proto.filter = function filter() {
          return _react.default.createElement("div", {
            className: "panel panel-border-tb"
          }, _react.default.createElement("div", {
            className: "panel-heading"
          }, _react.default.createElement(_reactRouterDom.Link, {
            to: properties.path + "/new",
            className: "pull-right"
          }, _react.default.createElement("i", {
            className: "fa fa-plus"
          }), " nieuw item aanmaken"), _react.default.createElement("h4", {
            className: "pnael-title"
          }, "Verfijn")), _react.default.createElement("div", {
            className: "panel-body"
          }, _react.default.createElement(_Search.default, {
            pushSearch: this.props.pushSearch,
            inputOnStack: this.props.inputOnStack,
            query: this.props.inputOnStack('q')
          })));
        };

        _proto.show = function show(item) {
          this.context.router.history.push(this.state.path + "/" + item.id);
        };

        _proto.edit = function edit(item) {
          this.context.router.history.push(this.state.path + "/" + item.id + "/edit");
        };

        _proto.destroy = function destroy(item) {
          this.props.dispatch((0, _actions.destroyItem)(properties.key, "" + properties.api, item.id));
        };

        _proto.render = function render() {
          var _this2 = this;

          var dropDown = {};

          if (!properties.noDropDown) {
            dropDown = (_readOnlyError("dropDown"), {
              name: 'Acties'
            });

            if (!properties.noEdit) {
              dropDown.dropdownButton = [{
                name: 'bekijken',
                onClick: this.show
              }, {
                name: 'wijzigen',
                onClick: this.edit
              }];
            }

            if (!properties.noDelete) {
              if (!dropDown.dropdownButton) {
                dropDown.dropdownButton = [];
              }

              dropDown.dropdownButton.push({
                divider: true
              });
              dropDown.dropdownButton.push({
                name: 'verwijderen',
                onClick: function onClick(item) {
                  _this2.setState({
                    forceUpdate: true
                  }, function () {
                    _this2.props.showModal(item, _this2.destroy);
                  });
                }
              });
            }
          }

          var rows = (0, _cloneDeep2.default)((0, _has2.default)(properties, 'rows') ? properties.rows : [{
            cols: properties.cols
          }]);
          rows[0].cols = (0, _compact2.default)((0, _flatten2.default)([rows[0].cols, [dropDown]]));

          var getTable = function getTable() {
            if ((0, _get2.default)(_this2.props, ['data', 'success'], false) === true) {
              return _react.default.createElement(_DataTable.default, {
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
            pending: (0, _get2.default)(this.props.data, 'pending', false),
            failed: (0, _get2.default)(this.props.data, 'failed', false)
          };

          var warning = function warning() {
            if ((0, _has2.default)(_this2.props, ['data', 'item', 'error'])) {
              return _react.default.createElement(_reactBootstrap.Alert, {
                bsStyle: "danger"
              }, (0, _get2.default)(_this2.props, ['data', 'item', 'error']));
            }
          };

          return _react.default.createElement(WrappedComponent, this.props, this.filter(), warning(), _react.default.createElement(_Pending.default, {
            state: state
          }, getTable()), this.props.children);
        };

        return Connection;
      }(_react.Component), Object.defineProperty(_class2, "propTypes", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {
          children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),
          auth: _propTypes.default.object,
          data: _propTypes.default.object,
          switchPage: _propTypes.default.func,
          pushSearch: _propTypes.default.func,
          pushOnState: _propTypes.default.func,
          pushStateAttempt: _propTypes.default.func,
          inputOnStack: _propTypes.default.func,
          dispatch: _propTypes.default.func,
          showModal: _propTypes.default.func
        }
      }), Object.defineProperty(_class2, "contextTypes", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {
          router: _propTypes.default.object
        }
      }), _temp)) || _class) || _class) || _class) || _class);
      return Connection;
    };
  }
});