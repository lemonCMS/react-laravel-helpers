(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "prop-types", "lodash/get", "lodash/has", "lodash/map", "lodash/isEmpty", "lodash/isString", "lodash/isArray", "lodash/compact", "lodash/find", "react", "react-bootstrap", "./Paginator", "../utils/moment", "../utils/numeral"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("prop-types"), require("lodash/get"), require("lodash/has"), require("lodash/map"), require("lodash/isEmpty"), require("lodash/isString"), require("lodash/isArray"), require("lodash/compact"), require("lodash/find"), require("react"), require("react-bootstrap"), require("./Paginator"), require("../utils/moment"), require("../utils/numeral"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes, global.get, global.has, global.map, global.isEmpty, global.isString, global.isArray, global.compact, global.find, global.react, global.reactBootstrap, global.Paginator, global.moment, global.numeral);
    global.DataTable = mod.exports;
  }
})(this, function (_exports, _propTypes, _get2, _has2, _map2, _isEmpty2, _isString2, _isArray2, _compact2, _find2, _react, _reactBootstrap, _Paginator, _moment, _numeral) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _get2 = _interopRequireDefault(_get2);
  _has2 = _interopRequireDefault(_has2);
  _map2 = _interopRequireDefault(_map2);
  _isEmpty2 = _interopRequireDefault(_isEmpty2);
  _isString2 = _interopRequireDefault(_isString2);
  _isArray2 = _interopRequireDefault(_isArray2);
  _compact2 = _interopRequireDefault(_compact2);
  _find2 = _interopRequireDefault(_find2);
  _react = _interopRequireWildcard(_react);
  _Paginator = _interopRequireDefault(_Paginator);
  _moment = _interopRequireDefault(_moment);
  _numeral = _interopRequireDefault(_numeral);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var DataTable =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(DataTable, _Component);

    function DataTable() {
      var _this;

      _this = _Component.call(this) || this;
      _this.renderRows = _this.renderRows.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderCols = _this.renderCols.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderRecords = _this.renderRecords.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderRecordCols = _this.renderRecordCols.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderRecordRows = _this.renderRecordRows.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderDropDownItems = _this.renderDropDownItems.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderPaginator = _this.renderPaginator.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getValue = _this.getValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.check = _this.check.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.pushIds = _this.pushIds.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        orderCol: null,
        checked: {},
        current: {},
        ids: {},
        idsTouched: {}
      };
      return _this;
    }

    var _proto = DataTable.prototype;

    _proto.pushIds = function pushIds(props) {
      var ids = this.state.ids;
      var current = [];
      (0, _map2.default)(props.records, function (record) {
        if (!(0, _find2.default)(ids, {
          id: record.id
        })) {
          ids.push({
            id: record.id,
            checked: false,
            clicked: false
          });
          current.push(record.id);
        }
      });
      this.setState({
        ids: ids,
        current: current
      });
    };

    _proto.renderRows = function renderRows() {
      var _this2 = this;

      if ((0, _has2.default)(this.props, 'rows')) {
        return (0, _map2.default)(this.props.rows, function (row, key) {
          return _react.default.createElement("tr", {
            key: key
          }, _this2.renderCols(row.cols));
        });
      }

      return _react.default.createElement("tr", null, this.renderCols(this.props.cols));
    };

    _proto.check = function check(event, key) {
      var checked = Object.assign(this.state.checked);
      var idsTouched = Object.assign(this.state.idsTouched);
      var ids = Object.assign(this.state.ids);

      if (!ids["box-" + key]) {
        ids["box-" + key] = [];
      }

      if (!idsTouched["box-" + key]) {
        idsTouched["box-" + key] = [];
      }

      (0, _map2.default)(this.props.records, function (record) {
        var index = ids["box-" + key].indexOf(record.id);

        if (index > -1) {
          ids["box-" + key].splice(index, 1);
        }

        if (event.target.checked) {
          ids["box-" + key].push(record.id);
        }

        var touched = idsTouched["box-" + key].indexOf(record.id);

        if (touched === -1) {
          idsTouched["box-" + key].push(record.id);
        }
      });
      checked["box-" + key] = event.target.checked;
      this.setState({
        ids: ids,
        idsTouched: idsTouched,
        checked: checked
      });
    };

    _proto.renderCols = function renderCols(cols) {
      var _this3 = this;

      return (0, _map2.default)(cols, function (col, key) {
        var orderName = 'order-' + key;

        var dbCol = function dbCol(orderType) {
          if ((0, _has2.default)(col, 'show')) {
            if ((0, _isString2.default)(col.show)) {
              return col.show + orderType;
            }

            if ((0, _isArray2.default)(col.show)) {
              return (0, _get2.default)(col.show, [0]) + orderType;
            }
          }
        };

        var select1 = function select1() {
          var state = _this3.state;
          state[orderName] = 'A ... Z';
          state.orderCol = dbCol();

          _this3.setState(state, function () {
            _this3.props.pushOnState('order', dbCol('Asc'));
          });
        };

        var select2 = function select2() {
          var state = _this3.state;
          state[orderName] = 'Z ... A';
          state.orderCol = dbCol();

          _this3.setState(state, function () {
            _this3.props.pushOnState('order', dbCol('Desc'));
          });
        };

        var filter = function filter(value) {
          var state = _this3.state;
          state[(0, _get2.default)(col, 'show')] = value;

          _this3.setState(state, function () {
            _this3.props.pushOnState((0, _get2.default)(col, 'show'), value);
          });
        };

        var actions = false;

        if ((0, _has2.default)(col, 'actions')) {
          actions = (0, _map2.default)(col.actions, function (button, key2) {
            return _react.default.createElement(_reactBootstrap.MenuItem, {
              key: key2,
              eventKey: key2,
              onSelect: function onSelect() {
                button.action((0, _get2.default)(_this3.state.ids, "box-" + key, []), _this3.props.dispatch);
              }
            }, button.name);
          });
        }

        var title = function title() {
          if ((0, _get2.default)(col, 'filterBy', false) !== false) {
            var onStack = _this3.props.inputOnStack((0, _get2.default)(col, 'show'));

            if (onStack) {
              return (0, _get2.default)(col, "filterBy[" + onStack + "].desc", '');
            }

            if (_this3.state[(0, _get2.default)(col, 'show')]) {
              return (0, _get2.default)(col, "filterBy[" + _this3.state[(0, _get2.default)(col, 'show')] + "].desc", '');
            }
          }

          if (_this3.state.orderCol === dbCol()) {
            if ((0, _get2.default)(_this3.state, orderName)) {
              return _this3.state[orderName];
            }
          }

          if (_this3.state.orderCol === null) {
            if (dbCol('Asc') === (0, _get2.default)(_this3.props, 'order')) {
              return 'A ... Z';
            }

            if (dbCol('Desc') === (0, _get2.default)(_this3.props, 'order')) {
              return 'Z ... A';
            }
          }

          return (0, _get2.default)(col, 'name', '');
        };

        var filterBy = (0, _get2.default)(col, 'filterBy', false);

        if (filterBy !== false) {
          return _react.default.createElement("th", {
            key: key,
            width: (0, _get2.default)(col, 'width', 'auto'),
            colSpan: (0, _get2.default)(col, 'colSpan', '1')
          }, _react.default.createElement(_reactBootstrap.ButtonToolbar, null, _react.default.createElement(_reactBootstrap.DropdownButton, {
            bsStyle: "link",
            title: title(),
            id: 'dropdown-size-extra-small' + key
          }, (0, _map2.default)((0, _get2.default)(col, 'filterBy', []), function (item, itemKey) {
            return _react.default.createElement(_reactBootstrap.MenuItem, {
              key: itemKey,
              eventKey: itemKey,
              onSelect: function onSelect() {
                filter(item.value);
              }
            }, item.desc);
          }), _react.default.createElement(_reactBootstrap.MenuItem, {
            divider: true
          }), _react.default.createElement(_reactBootstrap.MenuItem, {
            eventKey: 999,
            onSelect: function onSelect() {
              filter('');
            }
          }, "reset"), actions && _react.default.createElement(_reactBootstrap.MenuItem, {
            divider: true
          }), actions && actions)));
        }

        var order = (0, _get2.default)(col, 'order', false);

        if (order === true) {
          return _react.default.createElement("th", {
            key: key,
            width: (0, _get2.default)(col, 'width', 'auto'),
            colSpan: (0, _get2.default)(col, 'colSpan', '1')
          }, _react.default.createElement(_reactBootstrap.ButtonToolbar, null, _react.default.createElement(_reactBootstrap.DropdownButton, {
            bsStyle: "link",
            title: title(),
            id: 'dropdown-size-extra-small' + key
          }, _react.default.createElement(_reactBootstrap.MenuItem, {
            eventKey: "1",
            onSelect: select1
          }, "A ... Z"), _react.default.createElement(_reactBootstrap.MenuItem, {
            eventKey: "2",
            onSelect: select2
          }, "Z ... A"), actions && _react.default.createElement(_reactBootstrap.MenuItem, {
            divider: true
          }), actions && actions)));
        }

        if (actions) {
          return _react.default.createElement("th", {
            key: key,
            width: (0, _get2.default)(col, 'width', 'auto'),
            colSpan: (0, _get2.default)(col, 'colSpan', '1')
          }, _react.default.createElement("input", {
            type: "checkbox",
            onChange: function onChange(event) {
              _this3.check(event, key);
            },
            defaultChecked: _this3.state.checked["box-" + key]
          }), _react.default.createElement(_reactBootstrap.ButtonToolbar, null, _react.default.createElement(_reactBootstrap.DropdownButton, {
            bsStyle: "link",
            title: title(),
            id: 'dropdown-size-extra-small' + key
          }, actions)));
        }

        return _react.default.createElement("th", {
          key: key,
          width: (0, _get2.default)(col, 'width', 'auto'),
          colSpan: (0, _get2.default)(col, 'colSpan', '1')
        }, (0, _get2.default)(col, 'name', ''));
      });
    };

    _proto.renderRecords = function renderRecords() {
      var _this4 = this;

      return (0, _map2.default)(this.props.records, function (record, key) {
        return _this4.renderRecordRows(key, record);
      });
    };

    _proto.renderRecordRows = function renderRecordRows(key, record) {
      var _this5 = this;

      if ((0, _has2.default)(this.props, 'rows')) {
        return (0, _map2.default)(this.props.rows, function (row, keyRow) {
          return _react.default.createElement("tr", {
            key: key + "-" + keyRow,
            className: "data-table-row" + keyRow
          }, _this5.renderRecordCols(row.cols, record));
        });
      }

      return _react.default.createElement("tr", {
        key: key
      }, this.renderRecordCols(this.props.cols, record));
    };

    _proto.renderRecordCols = function renderRecordCols(cols, record) {
      var _this6 = this;

      return (0, _map2.default)(cols, function (col, key) {
        var value = _this6.getValue(record, col, key);

        return _react.default.createElement("td", {
          key: key,
          colSpan: (0, _get2.default)(col, 'colSpan', '1'),
          className: (0, _get2.default)(col, 'className', '')
        }, value);
      });
    };

    _proto.getValue = function getValue(record, col, key) {
      var _this7 = this;

      var cell = [];

      if ((0, _has2.default)(col, 'checkbox')) {
        var click = function click(event) {
          col.checkbox(event, record, _this7.props.dispatch);
          var ids = _this7.state.ids;
          var idsTouched = _this7.state.idsTouched;

          if (!ids["box-" + key]) {
            ids["box-" + key] = [];
          }

          if (!idsTouched["box-" + key]) {
            idsTouched["box-" + key] = [];
          }

          var index = ids["box-" + key].indexOf(record.id);

          if (index > -1) {
            ids["box-" + key].splice(index, 1);
          }

          if (event.target.checked) {
            ids["box-" + key].push(record.id);
          }

          var touched = idsTouched["box-" + key].indexOf(record.id);

          if (touched === -1) {
            idsTouched["box-" + key].push(record.id);
          }

          _this7.setState({
            ids: ids,
            idsTouched: idsTouched
          });
        };

        var defaultChecked = (0, _get2.default)(record, (0, _get2.default)(col, 'show'), false);

        var checked = function checked() {
          var ids = _this7.state.ids;
          var idsTouched = _this7.state.idsTouched;

          if (!idsTouched["box-" + key] || !ids["box-" + key]) {
            return defaultChecked;
          }

          var touched = idsTouched["box-" + key].indexOf(record.id);

          if (touched === -1) {
            return defaultChecked;
          }

          var checkedId = ids["box-" + key].indexOf(record.id);

          if (checkedId > -1) {
            return true;
          }

          return false;
        };

        return _react.default.createElement("input", {
          key: 'checkbox' + record.id,
          type: "checkbox",
          onChange: click,
          checked: checked()
        });
      }

      if ((0, _has2.default)(col, 'image')) {
        if ((0, _has2.default)(record, col.image)) {
          cell.push(_react.default.createElement(_reactBootstrap.Image, {
            key: "image",
            src: "/image/small/" + (0, _get2.default)(record, col.image),
            responsive: true,
            thumbnail: true
          }));
        }
      }

      if ((0, _has2.default)(col, 'text')) {
        cell.push(_react.default.createElement("span", {
          key: "text",
          className: "data-table-static-text"
        }, col.text));
      }

      if ((0, _has2.default)(col, 'edit')) {
        cell.push(_react.default.createElement("button", {
          className: "btn btn-link",
          key: "link",
          onClick: function onClick() {
            _this7.props.edit(record);
          }
        }, (0, _get2.default)(record, col.show, '')));
      } else if ((0, _has2.default)(col, 'link') && (0, _has2.default)(col, 'onClick')) {
        var _click = function _click(event) {
          event.preventDefault();
          col.onClick(record, _this7.context.router);
        };

        cell.push(_react.default.createElement("button", {
          className: "btn btn-link",
          key: "link",
          onClick: _click
        }, (0, _get2.default)(col, 'link')));
      }

      if ((0, _has2.default)(col, 'array') && (0, _has2.default)(col, 'arrayShow') && (0, _has2.default)(col, 'onClick')) {
        (0, _map2.default)((0, _get2.default)(record, col.array, []), function (item, key2) {
          var show = '';

          if ((0, _isArray2.default)(col.arrayShow)) {
            (0, _map2.default)(col.arrayShow, function (arrayCol) {
              show = show.concat((0, _get2.default)(item, arrayCol, ''), ' ');
            });
            show.trim();
          } else {
            show = (0, _get2.default)(item, col.arrayShow, '');
          }

          cell.push(_react.default.createElement("button", {
            type: "button",
            key: key2,
            className: "btn btn-link",
            onClick: function onClick() {
              col.onClick(item, _this7.context.router);
            }
          }, show));
        });
      } else if ((0, _has2.default)(col, 'array') && (0, _has2.default)(col, 'arrayShow')) {
        (0, _map2.default)((0, _get2.default)(record, col.array, []), function (item) {
          cell.push(_react.default.createElement("span", null, (0, _get2.default)(item, col.arrayShow, '')));
        });
      }

      if ((0, _has2.default)(col, 'show') && (0, _has2.default)(col, 'onClick')) {
        if (!(0, _isEmpty2.default)(record, col.show, '')) {
          var _click2 = function _click2(event) {
            event.preventDefault();
            col.onClick(record, _this7.context.router);
          };

          cell.push(_react.default.createElement("button", {
            className: "btn btn-link",
            key: "showClick",
            onClick: _click2
          }, (0, _get2.default)(record, col.show, '')));
        }
      }

      if ((0, _has2.default)(col, 'show') && !(0, _has2.default)(col, 'onClick') && !(0, _has2.default)(col, 'edit')) {
        if ((0, _isString2.default)(col.show)) {
          if ((0, _has2.default)(col, 'translate')) {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, (0, _get2.default)(col, ['translate', (0, _get2.default)(record, col.show, '')], '')));
          } else if ((0, _has2.default)(col, 'append')) {
            if (!(0, _isEmpty2.default)(record, col.show, '')) {
              cell.push(_react.default.createElement("span", {
                key: "'show'"
              }, (0, _get2.default)(record, col.show, 0) + (0, _get2.default)(col, 'append')));
            }
          } else if ((0, _has2.default)(col, 'filter') && col.filter === 'numeral') {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, (0, _numeral.default)(Number((0, _get2.default)(record, col.show, 0))).format('$0.00')));
          } else if ((0, _has2.default)(col, 'filter') && col.filter === 'date') {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, (0, _moment.default)((0, _get2.default)(record, col.show, '')).format((0, _get2.default)(col, 'format', 'YYYY-MM-DD'))));
          } else if ((0, _has2.default)(col, 'filter') && col.filter === 'dateTime') {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, (0, _moment.default)((0, _get2.default)(record, col.show, '')).format((0, _get2.default)(col, 'format', 'YYYY-MM-DD HH:mm'))));
          } else if ((0, _has2.default)(col, 'filter') && col.filter === 'unixDate') {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, _moment.default.unix((0, _get2.default)(record, col.show, '')).format((0, _get2.default)(col, 'format', 'YYYY-MM-DD'))));
          } else if ((0, _has2.default)(col, 'filter') && col.filter === 'unixDateTime') {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, _moment.default.unix((0, _get2.default)(record, col.show, '')).format((0, _get2.default)(col, 'format', 'YYYY-MM-DD HH:mm'))));
          } else {
            cell.push(_react.default.createElement("span", {
              key: "'show'"
            }, (0, _get2.default)(record, col.show, '')));
          }
        } else if ((0, _isArray2.default)(col.show)) {
          var value = [];
          (0, _map2.default)(col.show, function (field) {
            value.push(_react.default.createElement("span", {
              key: "'show'"
            }, (0, _get2.default)(record, field, '')));
          });
          return cell.push(_react.default.createElement("span", {
            key: "'show'"
          }, (0, _compact2.default)(value).join(' ')));
        }
      }

      if ((0, _has2.default)(col, 'dropdownButton')) {
        var dropDownItems = this.renderDropDownItems((0, _get2.default)(col, 'dropdownButton'), record);
        cell.push(_react.default.createElement(_reactBootstrap.DropdownButton, {
          key: "dbbutton",
          bsStyle: "default",
          bsSize: "xsmall",
          title: col.name,
          id: 'dropDown' + key
        }, dropDownItems));
      }

      return cell;
    };

    _proto.renderDropDownItems = function renderDropDownItems(buttons, record) {
      var _this8 = this;

      return (0, _map2.default)(buttons, function (button, key) {
        var click = function click() {
          if ((0, _has2.default)(button, 'onClick')) {
            button.onClick(record, _this8.context.router);
          }
        };

        if ((0, _has2.default)(button, 'divider')) {
          return _react.default.createElement(_reactBootstrap.MenuItem, {
            key: key,
            divider: true
          });
        }

        return _react.default.createElement(_reactBootstrap.MenuItem, {
          key: key,
          eventKey: key,
          onSelect: click
        }, button.name);
      });
    };

    _proto.renderPaginator = function renderPaginator() {
      var _this$props$paginator = this.props.paginator,
          currPage = _this$props$paginator.currPage,
          lastPage = _this$props$paginator.lastPage,
          onChange = _this$props$paginator.onChange;
      return _react.default.createElement(_Paginator.default, {
        currPage: currPage,
        lastPage: lastPage,
        onChange: onChange
      });
    };

    _proto.render = function render() {
      var _this9 = this;

      var noRecords = function noRecords() {
        if (_this9.props.records.length === 0) {
          return _react.default.createElement(_reactBootstrap.Alert, {
            bsStyle: "warning"
          }, "No records found.");
        }
      };

      var paged = !(0, _isEmpty2.default)(this.props.paginator) ? this.renderPaginator() : '';
      var rows = this.renderRows();
      var records = this.renderRecords();
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "table-responsive"
      }, _react.default.createElement("table", {
        className: "table table-bordered table-condensed table-data"
      }, _react.default.createElement("thead", null, rows), _react.default.createElement("tbody", null, records))), noRecords(), paged);
    };

    return DataTable;
  }(_react.Component);

  _exports.default = DataTable;

  _defineProperty(DataTable, "propTypes", {
    records: _propTypes.default.array.isRequired,
    cols: _propTypes.default.array,
    rows: _propTypes.default.array,
    paginator: _propTypes.default.shape({
      currPage: _propTypes.default.number,
      lastPage: _propTypes.default.number,
      onChange: _propTypes.default.func
    }),
    edit: _propTypes.default.func,
    pushOnState: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    inputOnStack: _propTypes.default.func
  });

  _defineProperty(DataTable, "contextTypes", {
    router: _propTypes.default.object.isRequired
  });
});